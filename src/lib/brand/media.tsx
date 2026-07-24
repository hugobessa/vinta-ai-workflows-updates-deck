import type { CSSProperties } from "react";

/** Resolve a bare filename to /assets, otherwise use the path as given. */
function assetSrc(src: string) {
  if (/^(https?:|\/|data:)/.test(src)) return src;
  return `/assets/${src}`;
}

export interface PhotoInner {
  /** Inner-image left/top offset in slide px, relative to this box (usually ≤ 0). */
  x: number;
  y: number;
  /** Inner-image drawn width/height in slide px (larger than the box). */
  w: number;
  h: number;
}

export interface PhotoProps {
  /** `/assets/…png`, a bare `img-….png` (resolved to /assets), or any URL. */
  src: string;
  alt?: string;
  /** object-fit within the parent box. Default `cover`. */
  fit?: "cover" | "contain";
  /** Focal point, e.g. `"center"` or `"50% 20%"`. */
  position?: string;
  /** Corner radius in slide px (or `true` for a circle). */
  rounded?: number | boolean;
  /**
   * Exact inner-image placement for a pixel-faithful crop: the parent box
   * clips, and the image is drawn at these offset/size coordinates. Overrides
   * `fit`/`position`. (This is how the template windows a slice of a photo.)
   */
  inner?: PhotoInner;
  /** Mirror horizontally / vertically. */
  flipX?: boolean;
  flipY?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * A photo that fills its parent box (size it with `<Place>`). Defaults to a
 * cover crop; pass `inner` for a pixel-exact windowed crop.
 *
 * @example <Place x={106} y={264} w={565} h={447}><Photo src="img-fee6f42770.png" /></Place>
 */
export function Photo({
  src,
  alt = "",
  fit = "cover",
  position = "center",
  rounded,
  inner,
  flipX,
  flipY,
  className = "",
  style,
}: PhotoProps) {
  const radius = rounded === true ? 9999 : typeof rounded === "number" ? rounded : undefined;
  const flip = flipX || flipY ? `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` : undefined;

  if (inner) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden ${className}`}
        style={{ borderRadius: radius, transform: flip, ...style }}
      >
        <img
          src={assetSrc(src)}
          alt={alt}
          style={{ position: "absolute", left: inner.x, top: inner.y, width: inner.w, height: inner.h, maxWidth: "none" }}
        />
      </div>
    );
  }

  return (
    <img
      src={assetSrc(src)}
      alt={alt}
      className={`block h-full w-full ${className}`}
      style={{ objectFit: fit, objectPosition: position, borderRadius: radius, transform: flip, ...style }}
    />
  );
}

export interface LogoProps {
  /** `blue` = brand mark; `white` recolors it for dark/blue backgrounds. */
  tone?: "blue" | "white";
  /** Height in slide px (width auto). Default 44. */
  height?: number;
  className?: string;
  style?: CSSProperties;
}

/** The vectored Vinta wordmark. */
export function Logo({ tone = "blue", height = 44, className = "", style }: LogoProps) {
  return (
    <img
      src="/vinta-logo.svg"
      alt="Vinta"
      className={`block ${className}`}
      style={{
        height,
        width: "auto",
        filter: tone === "white" ? "brightness(0) invert(1)" : undefined,
        ...style,
      }}
    />
  );
}
