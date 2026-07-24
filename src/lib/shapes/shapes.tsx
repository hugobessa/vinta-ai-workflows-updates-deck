import type { CSSProperties } from "react";
import { Place } from "../deck/Place";

const WHITE_FILTER = "brightness(0) invert(1)";

export interface ShapeProps {
  /** Tile number 1–24 (see the `shapes/` sheet). */
  n: number;
  /** `white` recolors the tile to solid white (for blue backgrounds). */
  tone?: "as-is" | "white";
  /** object-fit within the parent box. Default `contain`. */
  fit?: "contain" | "cover" | "fill";
  /** Mirror horizontally / vertically. */
  flipX?: boolean;
  flipY?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * One official decoration tile, filling its parent box (size it with `<Place>`
 * or a wrapper). There are 24 tiles; `tone="white"` is the on-blue variant.
 *
 * @example <Place x={1334} y={662} w={188} h={187}><Shape n={1} /></Place>
 */
export function Shape({ n, tone = "as-is", fit = "contain", flipX, flipY, className = "", style }: ShapeProps) {
  const nn = String(n).padStart(2, "0");
  const flip = flipX || flipY ? `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` : undefined;
  return (
    <img
      src={`/shapes/shape-${nn}.png`}
      alt=""
      className={`block h-full w-full ${className}`}
      style={{
        objectFit: fit,
        transform: flip,
        imageRendering: "-webkit-optimize-contrast" as CSSProperties["imageRendering"],
        filter: tone === "white" ? WHITE_FILTER : undefined,
        ...style,
      }}
    />
  );
}

export type Corner = "tl" | "tr" | "bl" | "br";

export interface ShapeClusterProps {
  /** Which corner to anchor to. */
  corner?: Corner;
  /** Tile numbers, laid out left-to-right / top-to-bottom. */
  shapes: number[];
  /** Grid columns. Default = shapes.length (single row). */
  cols?: number;
  /** Tile size in slide px. */
  size?: number;
  /** Gap between tiles in slide px. */
  gap?: number;
  /** Inset from the slide edge in slide px. */
  inset?: number;
  tone?: "as-is" | "white";
}

/**
 * A corner cluster of decoration tiles — the template's signature accent.
 *
 * @example <ShapeCluster corner="tr" shapes={[10, 8, 6, 9]} cols={2} />
 */
export function ShapeCluster({
  corner = "tr",
  shapes,
  cols,
  size = 80,
  gap = 0,
  inset = 40,
  tone = "as-is",
}: ShapeClusterProps) {
  const columns = cols ?? shapes.length;
  const vy = corner[0] === "t" ? { top: inset } : { bottom: inset };
  const vx = corner[1] === "l" ? { left: inset } : { right: inset };
  return (
    <div
      className="pointer-events-none absolute grid"
      style={{
        ...vy,
        ...vx,
        gridTemplateColumns: `repeat(${columns}, ${size}px)`,
        gap,
      }}
    >
      {shapes.map((n, i) => (
        <div key={i} style={{ width: size, height: size }}>
          <Shape n={n} tone={tone} />
        </div>
      ))}
    </div>
  );
}

export interface WatermarkItem {
  n: number;
  x: number;
  y: number;
  size?: number;
  tone?: "as-is" | "white";
  opacity?: number;
}

/**
 * Free-scattered faded tiles — the watermark treatment on blue section slides.
 *
 * @example <Watermark items={[{ n: 10, x: 1740, y: 0 }, { n: 19, x: 0, y: 900 }]} />
 */
export function Watermark({ items, defaultSize = 180, defaultOpacity = 0.35 }: {
  items: WatermarkItem[];
  defaultSize?: number;
  defaultOpacity?: number;
}) {
  return (
    <>
      {items.map((it, i) => (
        <Place key={i} x={it.x} y={it.y} w={it.size ?? defaultSize} h={it.size ?? defaultSize}>
          <div style={{ opacity: it.opacity ?? defaultOpacity }}>
            <Shape n={it.n} tone={it.tone ?? "white"} />
          </div>
        </Place>
      ))}
    </>
  );
}

export interface MosaicTile {
  /** A decoration tile number… */
  n?: number;
  /** …or an explicit image src (e.g. a photo `/assets/…png`). */
  src?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "as-is" | "white";
}

/**
 * An exact grid mosaic of tiles/photos at slide coordinates — the "shapes
 * showcase" cover pages. Feed it placements straight from the template data.
 */
export function Mosaic({ tiles }: { tiles: MosaicTile[] }) {
  return (
    <>
      {tiles.map((t, i) => (
        <Place key={i} x={t.x} y={t.y} w={t.w} h={t.h}>
          {t.n != null ? (
            <Shape n={t.n} fit="cover" tone={t.tone} />
          ) : (
            <img src={t.src} alt="" className="block h-full w-full object-cover" />
          )}
        </Place>
      ))}
    </>
  );
}
