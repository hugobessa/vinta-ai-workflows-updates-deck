import type { CSSProperties, ReactNode } from "react";

export interface PlaceProps {
  /** Left edge in slide px (0–1920). */
  x?: number;
  /** Top edge in slide px (0–1080). */
  y?: number;
  /** Width in slide px. */
  w?: number;
  /** Height in slide px. */
  h?: number;
  /** Right edge in slide px (alternative to `x`). */
  right?: number;
  /** Bottom edge in slide px (alternative to `y`). */
  bottom?: number;
  /** Stack order within the layer. */
  z?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Absolute-positioning escape hatch in the 1920×1080 slide coordinate space.
 * Mirrors the original template's model exactly — use it for decorative shapes,
 * photos, or any pixel-faithful placement. Prefer the flow layout components
 * (`SectionHeader`, `Columns`, `Grid`, `Stack`) for ordinary text content.
 *
 * @example
 * <Place x={1334} y={662} w={188} h={187}><Shape n={1} /></Place>
 */
export function Place({ x, y, w, h, right, bottom, z, className, style, children }: PlaceProps) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        right,
        bottom,
        zIndex: z,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
