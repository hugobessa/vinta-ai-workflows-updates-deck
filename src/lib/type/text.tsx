import type { CSSProperties, ReactNode } from "react";

export type TextAlign = "left" | "center" | "right";

export interface TextProps {
  /** Font size in slide px (number) or any CSS length. */
  size?: number | string;
  /** Numeric font weight (400 regular · 500 medium · 700 bold). */
  weight?: number;
  /** Text color — any CSS color, or `inherit` to take the slide's default. */
  color?: string;
  align?: TextAlign;
  /** Line-height (unitless multiplier or CSS value). */
  leading?: number | string;
  /** Max line length in slide px before wrapping. */
  maxWidth?: number | string;
  /** Use the JetBrains Mono face. */
  mono?: boolean;
  italic?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const px = (v: number | string | undefined) => (typeof v === "number" ? `${v}px` : v);

/**
 * The base text primitive. Honors explicit `\n` line breaks (via `pre-line`)
 * *and* wraps at `maxWidth`, so template text blocks drop in verbatim. The
 * semantic helpers below (`Title`, `Heading`, …) are thin presets over it.
 *
 * @example <Text size={93.6} weight={700} color="#0052FF">Título aqui</Text>
 */
export function Text({
  size,
  weight,
  color,
  align,
  leading,
  maxWidth,
  mono,
  italic,
  className = "",
  style,
  children,
}: TextProps) {
  return (
    <div
      className={`${mono ? "font-mono" : "font-sans"} ${className}`}
      style={{
        fontSize: px(size),
        fontWeight: weight,
        color,
        textAlign: align,
        lineHeight: leading,
        maxWidth: px(maxWidth),
        fontStyle: italic ? "italic" : undefined,
        whiteSpace: "pre-line",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Cover / hero headline (96px, bold). */
export function Title(props: TextProps) {
  return <Text size={96} weight={700} leading={1} {...props} />;
}

/** Thank-you / closing headline (112px, bold). */
export function BigTitle(props: TextProps) {
  return <Text size={112} weight={700} leading={1} {...props} />;
}

/** Section heading (h2 · 56px, bold). Pass `color` for blue/black/white. */
export function Heading(props: TextProps) {
  return <Text size={56} weight={700} leading={1.05} {...props} />;
}

/** Sub-heading (h3 · 22px, bold). */
export function Subheading(props: TextProps) {
  return <Text size={22} weight={700} leading={1.2} {...props} />;
}

/** Supporting deck under a heading (22px, muted). */
export function Subtitle(props: TextProps) {
  return <Text size={22} weight={400} leading={1.4} color="var(--color-vinta-muted)" {...props} />;
}

/** Eyebrow / step label — uppercase, tracked, bold (13px). */
export function Kicker({ className = "", color, children, ...rest }: TextProps) {
  return (
    <Text className={`kicker ${className}`} color={color} {...rest}>
      {children}
    </Text>
  );
}

/** Body copy (18px default). */
export function Body(props: TextProps) {
  return <Text size={18} weight={400} leading={1.5} {...props} />;
}

/** A big statistic number (96px, bold). Pair with a `Stat` label or caption. */
export function StatNumber(props: TextProps) {
  return <Text size={96} weight={700} leading={1} {...props} />;
}

/** Inline monospace token, e.g. a filename or command. */
export function InlineCode({
  onBlue,
  className = "",
  children,
}: {
  onBlue?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <code
      className={`font-mono ${
        onBlue ? "bg-white/20 text-white" : "bg-vinta-blue/10 text-vinta-blue-deep"
      } rounded px-1.5 py-0.5 text-[0.92em] ${className}`}
    >
      {children}
    </code>
  );
}
