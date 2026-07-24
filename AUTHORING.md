# Authoring Vinta slides

This repo is a **React + Tailwind slide-deck library** plus a **runnable slideshow**.
Making a new slide = composing a few documented components in a `.tsx` file. This guide
is written so an AI (or a person) can generate correct, on-brand slides from it alone.

---

## Run it

```bash
npm install
npm run dev            # slideshow at http://localhost:5173
npm run build          # typecheck + production build
```

**Slideshow controls:** `←/→` or `Space` move · `Home/End` jump to ends · type a number then
`Enter` to jump · `f` fullscreen · `o` overview grid · `#/N` deep-links slide N.

**Two decks (by URL path):**
- `/` → **your main slides** (`src/slides/`) — this is where you build your presentation.
- `/template` → the 50 official Vinta 2023 layouts (`src/template/`), each a **parametrized component**
  (`Slide01`–`Slide50`) whose defaults reproduce the official slide exactly. Import one and pass your
  content as props — per-slide props and examples are in **`src/template/CATALOG.md`**.

**URL modes (handy for screenshots):** `?solo=N` one slide, chromeless · `?shot=N` one slide at native
1920×1080 from the origin · `?print` every slide stacked. They apply to whichever deck the path selects
(e.g. `/template?shot=12`).

---

## Add a slide

**Fastest path:** import a ready layout from `@/template` and pass props —
`import { Slide12 } from "@/template"` then `<Slide12 title=… stats={…} />`. All 50 are catalogued with
their props in **`src/template/CATALOG.md`**. Build from the `@/lib` primitives below only for bespoke slides.

1. Create `src/slides/NN-name.tsx` — this is your main deck at `/`. (Files are auto-discovered and
   **ordered by filename** — no registry edit.) Use a two-digit prefix, e.g. `04-results.tsx`.
2. `export default` a component that returns a `<Slide>`.
3. Optionally `export const meta = { title, notes }` — `title` shows in the overview and HUD.

```tsx
import { Slide, SectionHeader, Columns, NumberedItem } from "@/lib";

export const meta = { title: "Results" };

export default function Slide51() {
  return (
    <Slide bg="white">
      <SectionHeader title="What shipped" subtitle="Three phases, one PR each." />
      <Columns n={3} className="mt-14">
        <NumberedItem num="01" title="Spec">Interview-driven.</NumberedItem>
        <NumberedItem num="02" title="Plan">Phased delivery.</NumberedItem>
        <NumberedItem num="03" title="Ship">Stacked branches.</NumberedItem>
      </Columns>
    </Slide>
  );
}
```

Everything is imported from the single entrypoint **`@/lib`**.

---

## The slide model

Every slide is a **1920×1080** canvas the deck scales to fit. Author at native size.

- `<Slide bg="white|blue|blue-section|gray|ink" deco={…}>` — the frame. `bg` also sets the default
  text color (white on blue, ink on white). `deco` is a full-bleed layer painted **behind** the
  content (shapes, watermarks). Content gets ~96px padding.
- **Flow layout** (preferred) — arrange text with `SectionHeader`, `Columns`, `Grid`, `Stack`, `Row`,
  `Center`. This is what you want for new slides.
- **`<Place x y w h>`** — absolute positioning in slide coordinates. The escape hatch for decoration,
  photos, or pixel-exact placement. The template reproductions lean on it; new slides rarely need it.

```tsx
<Slide bg="blue" deco={<Watermark items={[{ n: 10, x: 1720, y: -20 }]} />}>
  <Columns n={2} gap={80} align="center" className="h-full"> … </Columns>
</Slide>
```

---

## Design tokens (Tailwind)

Colors (defined in `src/index.css` — the canonical source) → `vinta-blue` `#0052ff` ·
`vinta-blue-deep` `#0040c8` · `vinta-blue-soft` `#2e6bff` · `vinta-blue-section` `#4a3aff` ·
`vinta-gray` `#d9d9d9` · `vinta-gray-light` `#f2f2f2` · `vinta-ink` `#0b1220` · `vinta-muted` `#3a4253`.
Use as `bg-vinta-blue`, `text-vinta-blue`, `border-vinta-gray`, etc. — never raw hex.

Type scale → `text-cover` (96) `text-thanks` (112) `text-h2` (56) `text-h3` (22) `text-h4` (18)
`text-subtitle` (22) `text-body` (18) `text-stat` (96) `text-kicker` (13). Fonts: `font-sans`
(DM Sans) and `font-mono` (JetBrains Mono).

---

## Component catalog

### Frame & layout
| Component | Purpose |
|---|---|
| `Slide` | The 1920×1080 canvas. `bg`, `deco`, `pad`. |
| `Place` | Absolute box in slide px. `x y w h` (or `right`/`bottom`, `z`). |
| `SectionHeader` | `kicker` + `title` + `subtitle`. The standard slide opener. |
| `Columns` | Equal columns. `n`, `gap`, `align`. |
| `Grid` | Explicit grid. `cols`, `rows`, `gap`. |
| `Stack` / `Row` | Flex column / row. `gap`, `align`, `justify`. |
| `Center` | Center children in the slide. `axis`. |

### Typography
`Title` (96) · `BigTitle` (112) · `Heading` (56) · `Subheading` (22) · `Subtitle` (muted) ·
`Kicker` (uppercase eyebrow) · `Body` (18) · `StatNumber` (96) · `InlineCode` (`onBlue?`) ·
`Text` (base primitive: `size weight color align leading maxWidth mono`).

### Shapes & brand
`Shape` (`n={1..24}`, `tone="white"` on blue) · `ShapeCluster` (`corner`, `shapes`, `cols`, `size`) ·
`Watermark` (`items`) · `Mosaic` (explicit tiles) · `Logo` (`tone="blue|white"`) ·
`Photo` (`src`, `fit`, `rounded`, `inner` for exact crops) · `CodeBlock` (`code`, `language`,
`theme="dark|light"`, `fontSize`).

### Content blocks
`Card` / `CardDark` / `CardBlue` · `Tile` (`num`,`title`) · `NumberedItem` (`num`,`title`,`tone`) ·
`Badge` · `Stat` (`value`,`caption`) · `Donut` (`percent`,`value`) · `DataTable` (`head`,`rows`) ·
`Pipeline` + `Step` (`name`,`artifact`) · `NumberedList` (`items`) · `Timeline` (`rows`) ·
`PersonCard` (`photo`,`name`,`role`) + `TeamGrid` · `Quote` (`name`,`role`,`photo`) ·
`MetaRow` (`items` of `{label,value}`).

---

## Archetype recipes

**Section divider (blue)**
```tsx
<Slide bg="blue" deco={<Watermark items={[{ n: 16, x: 1700, y: -10 }, { n: 19, x: -10, y: 900 }]} />}>
  <Center><Heading color="#fff">Part two — the orchestrator</Heading></Center>
</Slide>
```

**Stat row**
```tsx
<Slide bg="white">
  <Row gap={80} className="mt-10">
    <Stat value="200+" caption="Worldwide offices" />
    <Stat value="10M" caption="Active users" valueColor="var(--color-vinta-blue)" />
  </Row>
</Slide>
```

**Code**
```tsx
<Slide bg="white">
  <Place x={780} y={150} w={1044} h={780}>
    <CodeBlock language="ts" code={`const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)`} />
  </Place>
</Slide>
```

**Team**
```tsx
<TeamGrid n={4}>
  <PersonCard photo="img-….png" name="Ada" role="Engineer">Builds the harness.</PersonCard>
  …
</TeamGrid>
```

For full, working slides see the 50 parametrized layouts in `src/template/` (props in `src/template/CATALOG.md`).
