import type { ComponentType } from "react";
import type { DeckSlide, SlideMeta } from "@/lib/deck";

/**
 * Your main deck (served at `/`). Author it here: drop a file named
 * `NN-name.tsx` that `export default`s a component (and optionally
 * `export const meta = { title }`). Files are auto-discovered and ordered by
 * filename — no registry edit needed. Browse `/template` for all 50 layouts
 * for component patterns to copy from. See AUTHORING.md.
 */
const modules = import.meta.glob<{ default: ComponentType; meta?: SlideMeta }>(
  "./[0-9]*.tsx",
  { eager: true },
);

export const mainSlides: DeckSlide[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => ({
    id: path.replace(/^\.\//, "").replace(/\.tsx$/, ""),
    Component: mod.default,
    ...(mod.meta ?? {}),
  }));
