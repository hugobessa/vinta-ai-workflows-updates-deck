import type { CSSProperties, ReactNode } from "react";
import { Photo } from "../brand/media";

export interface PersonCardProps {
  /** Avatar image (`/assets/…` or bare `img-….png`). */
  photo?: string;
  name: ReactNode;
  role?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  /** Avatar size in slide px. Default 128. */
  avatar?: number;
  color?: string;
  roleColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** Avatar + name + role + optional blurb — the team-grid cell. */
export function PersonCard({
  photo,
  name,
  role,
  children,
  align = "left",
  avatar = 128,
  color,
  roleColor = "var(--color-vinta-blue)",
  className = "",
  style,
}: PersonCardProps) {
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center text-center" : ""} ${className}`} style={{ color, ...style }}>
      {photo && (
        <div style={{ width: avatar, height: avatar }} className="mb-4 overflow-hidden rounded-full">
          <Photo src={photo} rounded />
        </div>
      )}
      <div className="text-[26px] font-bold leading-tight">{name}</div>
      {role != null && <div className="mt-1 text-[18px] font-medium" style={{ color: roleColor }}>{role}</div>}
      {children != null && <div className="mt-2 text-[17px] leading-normal opacity-80">{children}</div>}
    </div>
  );
}

/** Grid of team members. Thin wrapper over an equal-column grid. */
export function TeamGrid({
  n = 4,
  gap = 48,
  className = "",
  style,
  children,
}: {
  n?: number;
  gap?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={`grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap, ...style }}
    >
      {children}
    </div>
  );
}

export interface QuoteProps {
  children: ReactNode;
  name?: ReactNode;
  role?: ReactNode;
  photo?: string;
  color?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** A pull-quote / testimonial with optional attribution. */
export function Quote({
  children,
  name,
  role,
  photo,
  color,
  size = 40,
  className = "",
  style,
}: QuoteProps) {
  return (
    <div className={className} style={{ color, ...style }}>
      <div className="font-medium" style={{ fontSize: size, lineHeight: 1.3 }}>
        {children}
      </div>
      {(name || photo) && (
        <div className="mt-6 flex items-center gap-4">
          {photo && (
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <Photo src={photo} rounded />
            </div>
          )}
          <div>
            {name && <div className="text-[20px] font-bold">{name}</div>}
            {role && <div className="text-[16px] opacity-75">{role}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export interface MetaItem {
  label: ReactNode;
  value: ReactNode;
}

/**
 * A row of label/value pairs — the "Cliente / Email / Data" strip on cover and
 * contact slides.
 */
export function MetaRow({
  items,
  gap = 60,
  color,
  labelColor,
  className = "",
  style,
}: {
  items: MetaItem[];
  gap?: number;
  color?: string;
  labelColor?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`flex ${className}`} style={{ gap, color, ...style }}>
      {items.map((it, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span className="text-[15px] font-medium" style={{ color: labelColor ?? "inherit", opacity: labelColor ? 1 : 0.6 }}>
            {it.label}
          </span>
          <span className="text-[19px] font-bold">{it.value}</span>
        </div>
      ))}
    </div>
  );
}
