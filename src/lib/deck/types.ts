import type { ComponentType } from "react";

/** Native authoring size of every slide. The deck scales this to the viewport. */
export const SLIDE_W = 1920;
export const SLIDE_H = 1080;

/** Metadata a slide file exports alongside its default component. */
export interface SlideMeta {
  /** Short title shown in the overview grid and speaker HUD. */
  title?: string;
  /** Optional speaker notes (not rendered on the slide itself). */
  notes?: string;
}

/** A slide as consumed by the <Deck>: its component plus resolved metadata. */
export interface DeckSlide extends SlideMeta {
  /** Stable id, derived from the slide's filename (e.g. "01-cover"). */
  id: string;
  Component: ComponentType;
}
