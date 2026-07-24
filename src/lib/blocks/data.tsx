import type { CSSProperties, ReactNode } from "react";

/** Default blue-ramp palette for categorical chart series (brand blues → grays). */
export const CHART_PALETTE = ["#0052ff", "#0040c8", "#2e6bff", "#a8c5f5", "#d9d9d9", "#0b1220"];

/** Round a raw maximum up to a friendly axis bound (1/2/2.5/5 × 10ⁿ). */
function niceMax(value: number): number {
  if (value <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const norm = value / pow;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return step * pow;
}

/** Even tick values from 0…max (inclusive), e.g. `[0, 25, 50, 75, 100]`. */
function axisTicks(max: number, count: number): number[] {
  return Array.from({ length: count + 1 }, (_, i) => (max / count) * i);
}

/** Drop trailing `.0` so `25.0` reads as `25` but `2.5` stays `2.5`. */
function fmtTick(n: number): string {
  return Number.isInteger(n) ? String(n) : String(+n.toFixed(2));
}

export interface StatProps {
  /** The headline figure, e.g. `200+`, `10M`, `$4.2B`. */
  value: ReactNode;
  /** Small caption beneath (e.g. "Worldwide offices"). */
  caption?: ReactNode;
  valueColor?: string;
  captionColor?: string;
  /** Figure size in slide px. Default 96. */
  size?: number;
  align?: "left" | "center";
  mono?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** A big statistic with an optional caption. */
export function Stat({
  value,
  caption,
  valueColor,
  captionColor,
  size = 96,
  align = "left",
  mono,
  className = "",
  style,
}: StatProps) {
  return (
    <div className={className} style={{ textAlign: align, ...style }}>
      <div
        className={`${mono ? "font-mono" : "font-sans"} font-bold`}
        style={{ fontSize: size, lineHeight: 1, color: valueColor }}
      >
        {value}
      </div>
      {caption != null && (
        <div className="mt-2 text-[24px] leading-tight" style={{ color: captionColor ?? "var(--color-vinta-muted)" }}>
          {caption}
        </div>
      )}
    </div>
  );
}

export interface DonutProps {
  /** Fraction filled, 0–1. */
  percent?: number;
  /** Label rendered in the middle (e.g. "10M"). */
  value?: ReactNode;
  /** Outer diameter in slide px. */
  size?: number;
  /** Ring thickness in slide px. */
  thickness?: number;
  color?: string;
  track?: string;
  valueColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** An SVG donut/progress ring with a centered value. */
export function Donut({
  percent = 0.7,
  value,
  size = 300,
  thickness = 46,
  color = "var(--color-vinta-blue)",
  track = "rgba(0,82,255,.15)",
  valueColor = "#fff",
  className = "",
  style,
}: DonutProps) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, ...style }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${c * percent} ${c}`}
        />
      </svg>
      {value != null && (
        <div
          className="absolute inset-0 flex items-center justify-center font-bold"
          style={{ fontSize: size * 0.18, color: valueColor }}
        >
          {value}
        </div>
      )}
    </div>
  );
}

export interface DataTableProps {
  head: ReactNode[];
  rows: ReactNode[][];
  /** CSS grid template for the columns, e.g. "1.2fr 1fr 1fr". */
  cols?: string;
  className?: string;
  style?: CSSProperties;
}

/** A bordered table with a blue header row (`.runtime-table`). */
export function DataTable({ head, rows, cols, className = "", style }: DataTableProps) {
  const template = cols ?? `repeat(${head.length}, minmax(0, 1fr))`;
  return (
    <div className={`overflow-hidden rounded border border-vinta-gray ${className}`} style={style}>
      <div
        className="grid bg-vinta-blue px-[18px] py-3.5 font-bold text-white"
        style={{ gridTemplateColumns: template, gap: 12 }}
      >
        {head.map((h, i) => (
          <div key={i} className="text-[15px]">{h}</div>
        ))}
      </div>
      {rows.map((row, r) => (
        <div
          key={r}
          className="grid border-b border-vinta-gray px-[18px] py-3.5 last:border-b-0"
          style={{ gridTemplateColumns: template, gap: 12 }}
        >
          {row.map((cell, i) => (
            <div key={i} className="text-[15px] text-vinta-ink">{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────────── Charts ─────────────────────────────
 * SVG charts sized in slide px. Size each with a `<Place>` box (or the
 * width/height props) and pass plain data — they compute their own scales,
 * axis ticks and colors, so the same layout renders any dataset. */

export interface BarDatum {
  /** Category label shown beside the bar. */
  label: ReactNode;
  /** Numeric length of the bar (drives length + axis scale). */
  value: number;
  /** Overrides the on-bar text (e.g. "$100,000 USD"); defaults to `value`. */
  valueLabel?: ReactNode;
  /** Bar fill; falls back to the chart palette by index. */
  color?: string;
}

export interface BarChartProps {
  data: BarDatum[];
  /** Value-axis upper bound. Auto-computed (rounded up) from the data when omitted. */
  max?: number;
  /** Number of value-axis ticks (0 hides the axis). Default 4 → 5 labels. */
  ticks?: number;
  width?: number;
  height?: number;
  /** Fills used when a datum has no `color`. */
  palette?: string[];
  labelColor?: string;
  axisColor?: string;
  /** Draw each value inside its bar. Default true. */
  showValues?: boolean;
  /** Color of the on-bar value text. Default white. */
  valueColor?: string;
  /** Fraction of each row occupied by the bar (0–1). Default 0.62. */
  barRatio?: number;
  className?: string;
  style?: CSSProperties;
}

/** A horizontal bar chart with category labels, on-bar values and a value axis. */
export function BarChart({
  data,
  max,
  ticks = 4,
  width = 1100,
  height = 680,
  palette = CHART_PALETTE,
  labelColor = "#000000",
  axisColor = "#000000",
  showValues = true,
  valueColor = "#ffffff",
  barRatio = 0.62,
  className = "",
  style,
}: BarChartProps) {
  const labelGutter = 92;
  const axisGutter = ticks > 0 ? 56 : 0;
  const plotW = width - labelGutter;
  const plotH = height - axisGutter;
  const bound = max ?? niceMax(Math.max(0, ...data.map((d) => d.value)));
  const rowH = plotH / Math.max(1, data.length);
  const barH = rowH * barRatio;
  const fontSize = Math.min(30, rowH * 0.32);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} style={style}>
      {data.map((d, i) => {
        const cy = i * rowH + rowH / 2;
        const w = bound > 0 ? (d.value / bound) * plotW : 0;
        return (
          <g key={i}>
            <text
              x={labelGutter - 20}
              y={cy}
              textAnchor="end"
              dominantBaseline="central"
              fontSize={fontSize}
              fontWeight={500}
              fill={labelColor}
            >
              {d.label}
            </text>
            <rect
              x={labelGutter}
              y={cy - barH / 2}
              width={Math.max(0, w)}
              height={barH}
              fill={d.color ?? palette[i % palette.length]}
            />
            {showValues &&
              (() => {
                const disp = d.valueLabel ?? d.value;
                const estW =
                  typeof disp === "string" || typeof disp === "number"
                    ? String(disp).length * fontSize * 0.6
                    : 60;
                const barEnd = labelGutter + w;
                // Prefer inside (white, right-aligned to the bar end). If the bar
                // is too short, drop the value just past it in the label color;
                // and if that would overflow the chart, pin it to the right edge.
                const inside = w >= estW + 28;
                const roomOutside = width - (barEnd + 16) >= estW;
                const x = inside ? barEnd - 16 : roomOutside ? barEnd + 16 : width;
                return (
                  <text
                    x={x}
                    y={cy}
                    textAnchor={inside || !roomOutside ? "end" : "start"}
                    dominantBaseline="central"
                    fontSize={fontSize}
                    fontWeight={700}
                    fill={inside ? valueColor : labelColor}
                  >
                    {disp}
                  </text>
                );
              })()}
          </g>
        );
      })}
      {ticks > 0 &&
        axisTicks(bound, ticks).map((t, i, arr) => {
          const x = labelGutter + (bound > 0 ? (t / bound) * plotW : 0);
          // Keep the end labels inside the SVG rather than centered on the edge.
          const anchor = i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle";
          return (
            <text
              key={i}
              x={x}
              y={plotH + 36}
              textAnchor={anchor}
              fontSize={fontSize}
              fontWeight={500}
              fill={axisColor}
            >
              {fmtTick(t)}
            </text>
          );
        })}
    </svg>
  );
}

export interface ColumnSeries {
  /** Legend label for this series. */
  name: ReactNode;
  color: string;
}

export interface ColumnGroup {
  /** X-axis category label. */
  label: ReactNode;
  /** One value per series, in the same order as `series`. */
  values: number[];
}

export interface ColumnChartProps {
  groups: ColumnGroup[];
  series: ColumnSeries[];
  /** Value-axis upper bound. Auto-computed (rounded up) from the data when omitted. */
  max?: number;
  /** Number of value-axis ticks. Default 4 → 5 labels. */
  ticks?: number;
  width?: number;
  height?: number;
  /** Show the series legend above the plot. Default true. */
  legend?: boolean;
  labelColor?: string;
  axisColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** A grouped vertical column chart with a legend and both axes. */
export function ColumnChart({
  groups,
  series,
  max,
  ticks = 4,
  width = 1200,
  height = 760,
  legend = true,
  labelColor = "#000000",
  axisColor = "#000000",
  className = "",
  style,
}: ColumnChartProps) {
  const legendH = legend ? 70 : 0;
  const axisGutterX = 70; // left gutter for value labels
  const axisGutterY = 60; // bottom gutter for category labels
  const plotX = axisGutterX;
  const plotY = legendH;
  const plotW = width - axisGutterX;
  const plotH = height - legendH - axisGutterY;
  const bound = max ?? niceMax(Math.max(0, ...groups.flatMap((g) => g.values)));
  const groupW = plotW / Math.max(1, groups.length);
  const groupPad = groupW * 0.18;
  const barW = (groupW - groupPad * 2) / Math.max(1, series.length);
  const yOf = (v: number) => plotY + plotH - (bound > 0 ? (v / bound) * plotH : 0);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} style={style}>
      {legend && (
        <g>
          {series.map((s, i) => {
            const gap = 260;
            const startX = width / 2 - ((series.length - 1) * gap) / 2;
            const cx = startX + i * gap;
            return (
              <g key={i}>
                <rect x={cx - 78} y={18} width={30} height={30} fill={s.color} />
                <text x={cx - 38} y={33} dominantBaseline="central" fontSize={30} fontWeight={500} fill={labelColor}>
                  {s.name}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {axisTicks(bound, ticks).map((t, i) => (
        <text
          key={i}
          x={axisGutterX - 18}
          y={yOf(t)}
          textAnchor="end"
          dominantBaseline="central"
          fontSize={30}
          fontWeight={500}
          fill={axisColor}
        >
          {fmtTick(t)}
        </text>
      ))}

      {groups.map((g, gi) => {
        const gx = plotX + gi * groupW + groupPad;
        return (
          <g key={gi}>
            {series.map((s, si) => {
              const v = g.values[si] ?? 0;
              const y = yOf(v);
              return (
                <rect
                  key={si}
                  x={gx + si * barW}
                  y={y}
                  width={barW * 0.86}
                  height={plotY + plotH - y}
                  fill={s.color}
                />
              );
            })}
            <text
              x={plotX + gi * groupW + groupW / 2}
              y={plotY + plotH + 40}
              textAnchor="middle"
              fontSize={30}
              fontWeight={500}
              fill={labelColor}
            >
              {g.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export interface PieDatum {
  value: number;
  color: string;
  /** Optional slice label (e.g. shown in a legend). */
  label?: ReactNode;
  /** Color of the percentage drawn on the slice. Default white. */
  labelColor?: string;
}

export interface PieChartProps {
  data: PieDatum[];
  size?: number;
  /** Inner-radius fraction (0 = full pie, 0.6 = donut). Default 0. */
  innerRadius?: number;
  /** Draw each slice's share as a `%` at its centroid. Default true. */
  showLabels?: boolean;
  /** Angle (deg) of the first slice's start edge. Default -90 (12 o'clock). */
  startAngle?: number;
  labelSize?: number;
  className?: string;
  style?: CSSProperties;
}

/** A pie / donut chart; slices are sized by value and labelled with their share. */
export function PieChart({
  data,
  size = 640,
  innerRadius = 0,
  showLabels = true,
  startAngle = -90,
  labelSize = 54,
  className = "",
  style,
}: PieChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;
  const ri = r * innerRadius;
  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;
  const point = (radius: number, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)] as const;
  };

  let angle = startAngle;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={style}>
      {data.map((d, i) => {
        const frac = Math.max(0, d.value) / total;
        const a0 = angle;
        const a1 = angle + frac * 360;
        angle = a1;
        const large = a1 - a0 > 180 ? 1 : 0;
        const [ox0, oy0] = point(r, a0);
        const [ox1, oy1] = point(r, a1);
        let path: string;
        if (ri > 0) {
          const [ix1, iy1] = point(ri, a1);
          const [ix0, iy0] = point(ri, a0);
          path = `M ${ox0} ${oy0} A ${r} ${r} 0 ${large} 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${ri} ${ri} 0 ${large} 0 ${ix0} ${iy0} Z`;
        } else {
          path = `M ${cx} ${cy} L ${ox0} ${oy0} A ${r} ${r} 0 ${large} 1 ${ox1} ${oy1} Z`;
        }
        const [lx, ly] = point((r + ri) / 2 || r * 0.6, (a0 + a1) / 2);
        return (
          <g key={i}>
            <path d={path} fill={d.color} />
            {showLabels && frac > 0.02 && (
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={labelSize}
                fontWeight={700}
                fill={d.labelColor ?? "#ffffff"}
              >
                {Math.round(frac * 100)}%
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
