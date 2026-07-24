import { Deck } from "@/lib";
import { mainSlides } from "./slides/registry";
import { templateSlides } from "./template/registry";

// Path-based decks:
//   /            → your main slides (src/slides/)
//   /template    → the 50-slide Vinta template reference (src/template/)
// Slide index still lives in the hash (#/N); capture modes in the query (?shot…).
const segment = window.location.pathname.split("/").filter(Boolean).pop() ?? "";

const deck =
  segment === "template" ? templateSlides : mainSlides;

export function App() {
  return <Deck slides={deck} />;
}
