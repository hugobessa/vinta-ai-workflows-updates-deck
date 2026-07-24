import type { ComponentType } from "react";
import type { DeckSlide, SlideMeta } from "@/lib/deck";

/**
 * The template deck (served at `/template`): the 50 official Vinta 2023 slides,
 * faithfully reproduced. Use it as a reference/starter for your own deck — copy
 * a slide file into `src/slides/` and edit it there, leaving these intact.
 */
const modules = import.meta.glob<{ default: ComponentType; meta?: SlideMeta }>(
  "./[0-9]*.tsx",
  { eager: true },
);

export const templateSlides: DeckSlide[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => ({
    id: "tpl-" + path.replace(/^\.\//, "").replace(/\.tsx$/, ""),
    Component: mod.default,
    ...(mod.meta ?? {}),
  }));
