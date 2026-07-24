import type { CSSProperties, ReactNode } from "react";
import { SLIDE_W, SLIDE_H } from "./types";

/** Named backgrounds; any other string is used as a raw CSS color. */
export type SlideBg = "white" | "blue" | "blue-section" | "gray" | "ink" | (string & {});

const BG: Record<string, { bg: string; fg: string }> = {
  white: { bg: "#ffffff", fg: "var(--color-vinta-ink)" },
  blue: { bg: "var(--color-vinta-blue)", fg: "#ffffff" },
  "blue-section": { bg: "var(--color-vinta-blue-section)", fg: "#ffffff" },
  gray: { bg: "var(--color-vinta-gray-light)", fg: "var(--color-vinta-ink)" },
  ink: { bg: "var(--color-vinta-ink)", fg: "#ffffff" },
};

export interface SlideProps {
  /** Background: a named token (`white`, `blue`, `blue-section`, `gray`, `ink`) or any CSS color. */
  bg?: SlideBg;
  /**
   * Decoration layer painted *behind* the content (shapes, watermarks, mosaics).
   * Rendered full-bleed at z-0 with pointer-events disabled.
   */
  deco?: ReactNode;
  /** Outer padding of the content layer, in slide px. `false` removes it. Default 96. */
  pad?: number | false;
  /** Foreground/text color override (otherwise derived from `bg`). */
  color?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * A single 1920×1080 slide canvas. Content is authored at native size and the
 * <Deck> scales it to fit. Two layers:
 *   - `deco`   — absolute, full-bleed, behind everything (z-0).
 *   - children — padded content layer (z-10); flow layout *and* absolute
 *                `<Place>` children both resolve against the full slide.
 *
 * @example
 * <Slide bg="blue" deco={<Watermark shapes={[10, 22, 16]} />}>
 *   <SectionHeader kicker="Step 1" title="create-spec" />
 * </Slide>
 */
export function Slide({
  bg = "white",
  deco,
  pad = 96,
  color,
  className = "",
  style,
  children,
}: SlideProps) {
  const c = BG[bg] ?? { bg, fg: "var(--color-vinta-ink)" };
  return (
    <div
      data-slide
      className={`relative overflow-hidden font-sans ${className}`}
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        background: c.bg,
        color: color ?? c.fg,
        letterSpacing: "-0.005em",
        ...style,
      }}
    >
      {deco != null && (
        <div className="pointer-events-none absolute inset-0 z-0">{deco}</div>
      )}
      <div
        className="absolute inset-0 z-10"
        style={{ padding: pad === false ? 0 : pad }}
      >
        {children}
      </div>
    </div>
  );
}
