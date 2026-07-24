---
name: create-deck
description: >-
  Build or extend a Vinta-branded slide deck using the React + Tailwind template
  in vinta-react-deck-template/. Use whenever the user wants to create a
  presentation, add or design slides, turn notes/outline/content into slides, or
  restyle content to the Vinta 2023 brand. Covers layouts, colors, fonts, photos
  and code blocks. Adapts the official template's "Dicas para melhor uso".
---

# Create a Vinta deck

The presentation system lives in **`vinta-react-deck-template/`** (a React + Tailwind app). Three
decks by URL:

| URL | Deck | Folder | Role |
|---|---|---|---|
| `/` | **Your deck** — author here | `src/slides/` | what you build |
| `/template` | 50 official Vinta layouts | `src/template/` | reference / copy from |

Build a deck by **importing a ready layout and passing your content as props** — never by inventing a new
visual style. The 50 official layouts live in `src/template/` as parametrized components (`Slide01`–`Slide50`,
whose defaults reproduce the official slide exactly); their per-slide props and copy-paste examples are
catalogued in **`src/template/CATALOG.md`**. Library primitives import from the single entrypoint **`@/lib`**.

## Workflow

1. `cd vinta-react-deck-template` — run `npm install` once, then `npm run dev` (→ http://localhost:5173, your deck at `/`).
2. **Pick a layout.** Browse `/template` (all 50; press `o` for the grid) and skim **`src/template/CATALOG.md`** to find the closest archetype. Note its number.
3. **Add the slide.** Create `src/slides/NN-name.tsx` (two-digit prefix sets the order; auto-discovered, no registry edit). `export default` a component that renders the layout with your content:

   ```tsx
   import { Slide12 } from "@/template";
   export const meta = { title: "Our numbers" };
   export default function Metrics() {
     return <Slide12 title="Our year" stats={[{ value: "10M", caption: "Users" }]} />;
   }
   ```

   Every prop is optional (omit → keeps the placeholder) and listed in CATALOG.md.
4. **Only for structural surgery** (changing the layout itself, not just its content): copy `src/template/NN.tsx` into `src/slides/` and edit the copy. The `<Slide>` canvas is a fixed 1920×1080; prefer flow layout components over absolute `<Place>`.
5. **Verify.** Screenshot at native size via `http://localhost:5173/?shot=N`, and run `npx tsc -b`.

Reach for a parametrized layout first (**`src/template/CATALOG.md`** — per-slide props + examples); drop to
raw `@/lib` primitives only for bespoke slides. The slide anatomy, full component catalog, design tokens and
archetype recipes live in **`vinta-react-deck-template/AUTHORING.md`** — read it for anything beyond the brand rules below.

---

## Brand rules — adapted from the official template's "Dicas para melhor uso deste Template"

**01 · The slides — reuse layouts, don't reinvent.** There is an extensive set of ready layouts
(`/template`, all 50 parametrized as `Slide01`–`Slide50`); import the closest one and pass your content as
props (**`src/template/CATALOG.md`** lists every slide's props and an example) rather than designing
something new. Change only the *content* (text, photos, code), never the visual system.

**02 · Default font — fonts are already wired.** DM Sans (body) and JetBrains Mono (code) load
automatically. Use the typography components (AUTHORING.md § Typography) or `font-sans`/`font-mono`.
Never hardcode another font or paste inline font styles.

**03 · Hexadecimals — use the brand tokens, not raw hex.** The palette is exposed as Tailwind tokens
(`vinta-blue`, `vinta-blue-section`, `vinta-gray`, `vinta-gray-light`, `vinta-ink`, …) — write
`text-vinta-blue`, `bg-vinta-blue`, `border-vinta-gray`, never the raw value. Canonical hex lives in
`src/index.css`; AUTHORING.md § Design tokens lists them. `<Slide bg="white|blue|blue-section|gray|ink">`
sets the background **and** the correct default text color (white on blue, ink on white) for you.

**04 · Our pictures — use the Vinta photo bank.** `public/assets/` holds the Vinta/Contraponto photos.
Place one with `<Photo src="img-….png" />` inside a sized `<Place>` box (cover-cropped by default; pass
`inner` for a pixel-exact window). Add your own photos to `public/assets/` and reference them the same
way. Decoration tiles: `<Shape n={1..24} />` (24 tiles) and `<ShapeCluster corner="tr" shapes={[…]} />`;
the vector wordmark is `<Logo tone="blue|white" />`.

**05 · Make a copy — build your own deck, keep the patterns.** Author only in `src/slides/` (the `/`
deck). Do **not** edit `src/template/` — it is the shared, pixel-faithful reference everyone imports from;
`import` its layouts and pass props, or (for structural changes) copy a slide into `src/slides/` and edit
the copy. Even in custom slides, respect the defined patterns — spacing (~96px slide padding), the type
scale, and the color tokens.

**06 · Codes — use the built-in `<CodeBlock>`.** Code is a real, editable, syntax-highlighted
component (via `prism-react-renderer`) — no external tools or pasted screenshots. Do not render
more than 60 characthers per line. Choose the theme by background, set the `language`, and pass 
the source as `code`; size and position it with `<Place>`:
- **Blue / dark background** → `theme="dark"`
- **White background** → `theme="light"`

Optional props: `fontSize` (px), `dots` (the window's traffic-light dots, on by default).

```tsx
<Place x={780} y={150} w={1044} h={780}>
  <CodeBlock
    language="ts"
    theme="dark"
    code={`const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);`}
  />
</Place>
```

---

## Deck-level tasks

- **Set the cover/closing:** edit `src/slides/01-cover.tsx` and the closing slide (title, `MetaRow`, contact).
- **Reorder:** rename files (the `NN-` prefix drives order).
- **Present:** `npm run dev`, open `/`, press `f` for fullscreen, `←/→` to move, `o` for the overview grid.
- **Turn an outline into a deck:** map each section to the closest layout from `/template`, create one `src/slides/NN-*.tsx` per slide, then screenshot-check each with `?shot=N`.
