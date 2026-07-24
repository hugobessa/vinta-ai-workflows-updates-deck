import type { CSSProperties, ReactNode } from "react";

interface Common {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * White content card with a blue top accent — the standard panel on light
 * slides (`.col-card`).
 */
export function Card({ accent = "var(--color-vinta-blue)", className = "", style, children }: Common & { accent?: string }) {
  return (
    <div
      className={`rounded border border-vinta-gray bg-white p-7 ${className}`}
      style={{ borderTopWidth: 6, borderTopColor: accent, ...style }}
    >
      {children}
    </div>
  );
}

/** Translucent dark card for use *on blue* slides (`.col-card-dark`). */
export function CardDark({ className = "", style, children }: Common) {
  return (
    <div
      className={`rounded bg-black/[0.18] p-7 text-white ${className}`}
      style={{ borderTop: "6px solid #fff", ...style }}
    >
      {children}
    </div>
  );
}

/** Left-accented translucent card for lists on blue slides (`.card-blue`). */
export function CardBlue({ className = "", style, children }: Common) {
  return (
    <div
      className={`rounded bg-white/10 px-7 py-6 text-white ${className}`}
      style={{ borderLeft: "4px solid #fff", ...style }}
    >
      {children}
    </div>
  );
}

/**
 * A numbered tile with a blue left rule (`.tile`) — used in the 3×2 grids.
 *
 * @example <Tile num="01" title="Bootstrap">Scaffolds ai-tools/ and wiring.</Tile>
 */
export function Tile({
  num,
  title,
  children,
  className = "",
  style,
}: Common & { num?: ReactNode; title?: ReactNode }) {
  return (
    <div className={`py-2 pl-5 ${className}`} style={{ borderLeft: "3px solid var(--color-vinta-blue)", ...style }}>
      {num != null && <div className="mb-1.5 font-mono text-sm font-bold text-vinta-blue">{num}</div>}
      {title != null && <div className="mb-1 text-h4 font-bold">{title}</div>}
      {children != null && <div className="text-[15px] leading-normal text-vinta-muted">{children}</div>}
    </div>
  );
}

/**
 * A numbered column item (`.col`): mono number, heading, body. On blue slides
 * pass `tone="light"` for readable secondary text.
 */
export function NumberedItem({
  num,
  title,
  tone = "dark",
  children,
  className = "",
  style,
}: Common & { num?: ReactNode; title?: ReactNode; tone?: "dark" | "light" }) {
  return (
    <div className={className} style={style}>
      {num != null && <div className="mb-2 font-mono text-sm font-bold text-vinta-blue">{num}</div>}
      {title != null && <div className="mb-3 text-h3 font-bold">{title}</div>}
      {children != null && (
        <div className={`text-base leading-normal ${tone === "light" ? "text-white/90" : "text-vinta-muted"}`}>
          {children}
        </div>
      )}
    </div>
  );
}

/** Small mono pill/badge. `onBlue` uses the translucent-white variant. */
export function Badge({ onBlue, className = "", children }: Common & { onBlue?: boolean }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 font-mono text-xs ${
        onBlue ? "bg-white/20 text-white" : "bg-vinta-blue/10 text-vinta-blue-deep"
      } ${className}`}
    >
      {children}
    </span>
  );
}
