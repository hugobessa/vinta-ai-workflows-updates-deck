import type { CSSProperties, ReactNode } from "react";
import { Kicker, Heading, Subtitle, type TextAlign } from "../type/text";

interface Box {
  gap?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Vertical flex stack. */
export function Stack({
  gap = 16,
  align,
  justify,
  className = "",
  style,
  children,
}: Box & { align?: CSSProperties["alignItems"]; justify?: CSSProperties["justifyContent"] }) {
  return (
    <div
      className={`flex flex-col ${className}`}
      style={{ gap, alignItems: align, justifyContent: justify, ...style }}
    >
      {children}
    </div>
  );
}

/** Horizontal flex row. */
export function Row({
  gap = 16,
  align = "center",
  justify,
  wrap,
  className = "",
  style,
  children,
}: Box & {
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
}) {
  return (
    <div
      className={`flex ${wrap ? "flex-wrap" : ""} ${className}`}
      style={{ gap, alignItems: align, justifyContent: justify, ...style }}
    >
      {children}
    </div>
  );
}

/** Equal-width columns. */
export function Columns({
  n,
  gap = 56,
  align = "start",
  className = "",
  style,
  children,
}: Box & { n: number; align?: CSSProperties["alignItems"] }) {
  return (
    <div
      className={`grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap, alignItems: align, ...style }}
    >
      {children}
    </div>
  );
}

/** Explicit CSS grid. `cols`/`rows` accept a track count or a template string. */
export function Grid({
  cols,
  rows,
  gap = 24,
  className = "",
  style,
  children,
}: Box & { cols?: number | string; rows?: number | string }) {
  const track = (v: number | string | undefined) =>
    v == null ? undefined : typeof v === "number" ? `repeat(${v}, minmax(0, 1fr))` : v;
  return (
    <div
      className={`grid ${className}`}
      style={{ gridTemplateColumns: track(cols), gridTemplateRows: track(rows), gap, ...style }}
    >
      {children}
    </div>
  );
}

/** Centers its children within the slide content area (both axes by default). */
export function Center({
  axis = "both",
  className = "",
  style,
  children,
}: {
  axis?: "both" | "x" | "y";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={`flex h-full w-full ${className}`}
      style={{
        alignItems: axis === "x" ? undefined : "center",
        justifyContent: axis === "y" ? undefined : "center",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Fixed-size gap. */
export function Spacer({ size = 24 }: { size?: number }) {
  return <div style={{ height: size, flex: "0 0 auto" }} />;
}

export interface SectionHeaderProps {
  kicker?: ReactNode;
  kickerColor?: string;
  title: ReactNode;
  /** Heading color — defaults to inherit (white on blue, ink on white). */
  titleColor?: string;
  subtitle?: ReactNode;
  align?: TextAlign;
  /** Max width of the block in slide px. */
  maxWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * The standard kicker + heading + subtitle block that opens most slides.
 *
 * @example
 * <SectionHeader kicker="Step 2" kickerColor="#0052FF"
 *   title="plan-feature" subtitle="Reads the matching spec, emits a phased plan." />
 */
export function SectionHeader({
  kicker,
  kickerColor,
  title,
  titleColor,
  subtitle,
  align = "left",
  maxWidth = 1300,
  className = "",
  style,
}: SectionHeaderProps) {
  return (
    <div className={className} style={{ maxWidth, textAlign: align, ...style }}>
      {kicker != null && (
        <Kicker color={kickerColor} align={align} className="mb-3">
          {kicker}
        </Kicker>
      )}
      <Heading color={titleColor} align={align}>
        {title}
      </Heading>
      {subtitle != null && (
        <Subtitle align={align} className="mt-4" style={{ marginInline: align === "center" ? "auto" : undefined }}>
          {subtitle}
        </Subtitle>
      )}
    </div>
  );
}
