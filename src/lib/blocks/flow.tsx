import type { CSSProperties, ReactNode } from "react";

/** One step card in a <Pipeline>. */
export function Step({
  name,
  artifact,
  children,
  className = "",
  style,
}: {
  name: ReactNode;
  artifact?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`flex flex-1 flex-col gap-3 rounded border border-vinta-gray bg-white p-7 ${className}`}
      style={{ borderTop: "6px solid var(--color-vinta-blue)", ...style }}
    >
      <div className="font-mono text-[28px] font-bold text-vinta-ink">{name}</div>
      {artifact != null && (
        <div className="rounded bg-vinta-gray-light px-3 py-2.5 font-mono text-sm text-vinta-ink">{artifact}</div>
      )}
      {children != null && <div className="text-[15px] text-vinta-muted">{children}</div>}
    </div>
  );
}

/** Horizontal pipeline of <Step>s joined by arrows. */
export function Pipeline({ className = "", style, children }: { className?: string; style?: CSSProperties; children?: ReactNode }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={`flex items-stretch ${className}`} style={style}>
      {items.map((child, i) => (
        <div key={i} className="flex flex-1 items-stretch">
          {child}
          {i < items.length - 1 && (
            <div className="flex w-16 items-center justify-center text-2xl font-bold text-vinta-blue">→</div>
          )}
        </div>
      ))}
    </div>
  );
}

export interface NumberedListItem {
  title?: ReactNode;
  body: ReactNode;
}

/** Numbered list with mono index chips on a soft rail (`.loop-list`). */
export function NumberedList({
  items,
  start = 1,
  className = "",
  style,
}: {
  items: NumberedListItem[];
  start?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`} style={style}>
      {items.map((it, i) => (
        <div
          key={i}
          className="grid items-start gap-5 rounded bg-vinta-gray-light px-6 py-4"
          style={{ gridTemplateColumns: "56px 1fr", borderLeft: "4px solid var(--color-vinta-blue)" }}
        >
          <div className="font-mono text-[32px] font-bold text-vinta-blue">{start + i}</div>
          <div className="text-[17px] leading-normal">
            {it.title != null && <strong className="text-vinta-ink">{it.title} </strong>}
            {it.body}
          </div>
        </div>
      ))}
    </div>
  );
}

export interface TimelineRow {
  label: ReactNode;
  children: ReactNode;
}

/** Labelled timeline rows on a blue slide (`.timeline`). */
export function Timeline({
  rows,
  className = "",
  style,
}: {
  rows: TimelineRow[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`flex flex-col gap-5 ${className}`} style={style}>
      {rows.map((r, i) => (
        <div key={i} className="grid items-stretch gap-6" style={{ gridTemplateColumns: "160px 1fr" }}>
          <div className="flex items-center rounded bg-black/25 px-6 py-4 font-mono text-[22px] font-bold text-white">
            {r.label}
          </div>
          <div className="rounded bg-white/10 px-6 py-4 text-white" style={{ borderLeft: "4px solid #fff" }}>
            {r.children}
          </div>
        </div>
      ))}
    </div>
  );
}
