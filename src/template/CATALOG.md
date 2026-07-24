# Template slide catalog — the 50 Vinta layouts, parametrized

Every `src/template/NN.tsx` is now a **prop-driven component**. Its defaults reproduce the
official Vinta 2023 slide **exactly** (pixel-verified), so you can:

- browse `/template` to see all 50 rendered with their defaults, then
- **import the layout and pass your content** — no copying files, no editing pixel coordinates.

```tsx
// src/slides/03-metrics.tsx  →  your deck at "/"
import { Slide12 } from "@/template";

export const meta = { title: "Our numbers" };

export default function Metrics() {
  return (
    <Slide12
      title="Our year in numbers"
      body={["Two lines of\nsupporting copy.", "A second\nparagraph."]}
      stats={[
        { value: "200+", caption: "Offices" },
        { value: "10M", caption: "Active users" },
        { value: "85+", caption: "Team members" },
        { value: "$40M", caption: "Raised" },
      ]}
    />
  );
}
```

## How the layouts behave

- **Import by number:** `import { Slide12 } from "@/template"` (barrel), or
  `import Slide12 from "@/template/12"`. Prop types come along: `import type { Slide12Props } from "@/template/12"`.
- **Everything is optional.** Omit a prop and the slide keeps its original placeholder — handy while drafting.
- **Content is a prop; decoration is fixed.** Titles, body copy, list/stat/card/team/contact items,
  code, and hero/subject photos are props. The brand furniture (backgrounds, corner shape clusters,
  footer strips, logos) stays baked in — you cannot (and should not) move it.
- **Item arrays map onto fixed slots.** A slide with four stat boxes accepts up to four `stats`; extra
  items are ignored, and passing fewer simply leaves the later slots blank. Item count is capped per slide.
- **`\n` makes a hard line break** inside any text prop (titles, captions, paragraphs).
- **Backgrounds are part of the layout** (`bg="blue-section"` on 15/48, etc.) — you don't set them.
- **Photos:** pass a bare `img-….png` (resolved from `public/assets/`) or any URL. Add your own images
  to `public/assets/` and reference them by filename. See AUTHORING.md § Design tokens for colors/fonts.

Prefer a layout close to your content over forcing content into the wrong one. When several fit, the
`/template` overview grid (press `o`) is the fastest way to choose.

---

## Index by archetype

| Cluster | Slides |
|---|---|
| Decoration / shape palettes (no content) | 01, 02, 03 |
| Covers & title pages | 04, 05, 07 |
| Section dividers / big statements | 06, 20, 21 |
| Two-column text + hero photo | 08, 09, 30, 34 |
| Numbered & bulleted lists | 10, 14, 16, 18, 19 |
| Feature-card grids | 11, 15, 17, 33 |
| Stats & metrics | 12, 13, 22 |
| Charts & diagrams | 23 (bar), 24 (pie), 25 (column), 26 (gauges) |
| Image showcase / comparison | 27, 28, 29 |
| Logo / badge grids | 31, 32 |
| Code | 35, 36, 37, 38, 39, 40, 41 |
| Team grids | 42, 43, 44 |
| Thanks / closing | 45, 46, 47, 48, 49 |
| Back cover (full-bleed image) | 50 |

---

## Decoration / shape palettes — 01, 02, 03

Reference boards of the Vinta shape/photo tiles with a Portuguese "copy these shapes" caption.
**Not content slides** and intentionally left un-parametrized — copy individual `<Shape n={…}>` /
`<Photo>` tiles out of them into your own slides rather than presenting them.

---

## Covers & title pages

### 04 · Proposal cover (light)
Big two-line title over a full-bleed photo, with a client/email/date footer.
- `line1?: string` — first title line (black)
- `line2?: string` — second title line (blue accent)
- `meta?: {label, value}[]` — up to 3 footer pairs

```tsx
<Slide04 line1="Redesign" line2="Proposal"
  meta={[{ label: "Cliente", value: "Acme" }, { label: "Email", value: "hi@vinta.com.br" }, { label: "Data", value: "March 2026" }]} />
```

### 05 · Cover title (variant)
One-line cover title + client/email/date footer, shapes decoration.
- `title?: string` (use `\n` to wrap) · `meta?: {label, value}[]` (up to 3)

### 07 · Cover / section title over photo (white text)
White title with the meta trio **above** it, over a photo panel.
- `title?: string` (`\n` to wrap) · `meta?: {label, value}[]` (up to 3)

---

## Section dividers / big statements

### 06 · Section divider
Two-line statement, second line blue. No body.
- `line1?: string` · `line2?: string`

```tsx
<Slide06 line1="Part two —" line2="the rollout" />
```

### 20 · Big statement over photo
Kicker + large white statement over a full-bleed photo. Great for a quote or thesis.
- `kicker?: string` · `statement?: string` (`\n` to wrap)

### 21 · Big statement + side photo
White title + paragraph on the left, hero photo on the right.
- `title?: string` · `body?: string` · `photo?: string` (right-side hero src)

---

## Two-column text + hero photo

### 08 · Title + photo panel with overlay text
Blue kicker/title on the left; white heading + paragraph over a photo panel on the right.
- `title?: string` · `heading?: string` · `body?: string` · `photo?: string`

### 09 · Heading + two paragraphs + side photo
- `title?: string` (blue) · `body?: string[]` (two paragraphs) · `photo?: string` (large right panel)

### 30 · Blue title + paragraph + side portrait
- `title?: string` (blue) · `body?: string` · `photo?: string` (large left portrait)

### 34 · Blue title + stacked list + side photo
- `title?: string` (blue) · `items?: string[]` (one per line) · `photo?: string` (large left panel)

```tsx
<Slide34 title="What we cover" items={["Discovery", "Design", "Build", "Launch"]} photo="img-….png" />
```

---

## Numbered & bulleted lists

### 10 · Title + intro + four numbered items (2×2)
- `title?: string` · `intro?: string` · `items?: string[]` (up to 4; write the full `"01. …"` string)

### 14 · Six numbered rows (2 cols × 3)
- `items?: {number, title}[]` (up to 6)

```tsx
<Slide14 items={[{ number: "01", title: "Discovery" }, { number: "02", title: "Design" }, /* … */]} />
```

### 16 · Bulleted list (2 cols × 4)
- `title?: string` (blue) · `items?: string[]` (up to 8; plain text — the bullet marker is rendered natively, don't prefix `"● "`)
- Each item is capped at **2 lines** (fixed-height rows keep the bullets aligned); longer text is truncated, so keep items short

### 18 · Five numbered feature blocks
- `items?: {number, title, text}[]` (up to 5)

### 19 · Heading + lead + three side items
- `title?: string` (blue) · `subtitle?: string` (bold lead) · `body?: string` · `items?: {number, title, text}[]` (up to 3)

---

## Feature-card grids

### 11 · Right-column features + photo overlay
- `title?: string` · `overlayTitle?: string` · `overlayBody?: string` · `features?: {title, text}[]` (up to 3)

### 15 · Six numbered cards (3×2) — blue-section background
The `"N. "` index is prepended automatically.
- `cards?: {title, text}[]` (up to 6)

```tsx
<Slide15 cards={[{ title: "Fast", text: "Ships in weeks." }, { title: "Typed", text: "End to end." }, /* … up to 6 */]} />
```

### 17 · Left intro + four numbered cards (over photo)
`"01"–"04"` labels rendered automatically.
- `title?: string` (white) · `body?: string` (white) · `cards?: {title, text}[]` (up to 4)

### 33 · Four quadrant cards (2×2) — full-bleed blue
- `title?: string` (centered, white) · `cards?: {title, text}[]` (up to 4)

---

## Stats & metrics

### 12 · Stats + text (blue panel + 2×2 metrics)
- `title?: string` (white) · `body?: string[]` (two paragraphs) · `stats?: {value, caption}[]` (up to 4)

### 13 · Title + intro + four metrics
- `title?: string` · `body?: string` · `stats?: {value, caption}[]` (up to 4)

### 22 · Three large metrics + bottom text
- `stats?: {value, caption}[]` (up to 3) · `title?: string` · `body?: string`

```tsx
<Slide22 stats={[{ value: "32+", caption: "Countries" }, { value: "500+", caption: "Clients" }, { value: "10M", caption: "Users" }]}
  title="Proven at scale" body="Some supporting copy." />
```

---

## Charts & diagrams

Charts render dynamically from data (SVG), so they scale to any dataset — no image assets.
The underlying primitives (`BarChart`, `PieChart`, `ColumnChart`, `Donut`) live in `@/lib`.

### 23 · Horizontal bar chart
Bars, on-bar values and the value axis all scale to the data.
- `title?: string` · `body?: string`
- `data?: {label, value, valueLabel?, color?}[]` (top → bottom) · `max?: number` (axis bound, auto by default)

### 24 · Pie chart + legend
Slice sizes, the on-slice `%` and the legend all derive from `data`.
- `title?: string`
- `data?: {value, color, label?, labelColor?}[]` (up to 3 in the legend)

### 25 · Grouped column chart
- `title?: string`
- `series?: {name, color}[]` (legend) · `groups?: {label, values[]}[]` (one value per series) · `max?: number`

### 26 · Three radial-gauge panels
Each panel is a `Donut` gauge with the stat in its center.
- `panels?: {stat, percent?, title, caption, color?}[]` (up to 3)

---

## Image showcase / comparison

### 27 · Centered title + intro over an image band
- `title?: string` (blue) · `body?: string[]` (two centered blocks)

### 28 · Two-image comparison
- `title?: string` · `photos?: string[]` (up to 2: left, right)

```tsx
<Slide28 title="Before / after" photos={["img-before.png", "img-after.png"]} />
```

### 29 · Text + hero collage
- `title?: string` · `body?: string` (blue) · `photo?: string` (large collage image)

---

## Logo / badge grids

### 31 · 8-tile logo/photo grid (no text)
- `photos?: string[]` (up to 8, mapped over a 2×4 layout)

```tsx
<Slide31 photos={["logo-a.png", "logo-b.png", "logo-c.png", /* … up to 8 */]} />
```

### 32 · Labels + badges + large graphic
- `title?: string` · `labels?: string[]` (up to 6) · `graphic?: string` (large right image)

---

## Code

All code slides share `title`, `code`, `language` (Prism id: `js`, `ts`, `tsx`, `bash`, `json`, `python`…),
and `fontSize` (slide px). The window **theme is fixed by the layout** — pick the slide whose look you want:

| Slide | Look |
|---|---|
| 35 | Dark window, blue title |
| 36 | Light window, white title, full-bleed photo bg |
| 37 | Dark window, wide, blue title |
| 38 | Dark window + `topics?: string[]` (up to 4 side notes) |
| 39 | Dark window + `subtitle?: string` |
| 40 | Light window + `body?: string[]` (two paragraphs) + side photo |
| 41 | Dark window + `body?: string[]` (two paragraphs) + photo bg |

```tsx
<Slide35 title="Compose" language="ts"
  code={`const compose = (...fns) => (x) =>\n  fns.reduceRight((v, f) => f(v), x);`} />
```

---

## Team grids

### 42 · Six members (3×2) + intro
- `title?: string` (blue) · `body?: string` · `people?: {name, role}[]` (up to 6)

### 43 · Four members (row) — dark background
- `title?: string` · `body?: string` · `people?: {name, role, line1, line2}[]` (up to 4)

### 44 · Four members (row) with bios
- `title?: string` · `people?: {role, name, line1, line2}[]` (up to 4)

```tsx
<Slide42 title="The team"
  people={[{ name: "Ada Lovelace", role: "Engineer" }, { name: "Alan Turing", role: "Researcher" }, /* … up to 6 */]} />
```

---

## Thanks / closing

### 45 · "Thank you" + two contact pairs
- `title?: string` · `contacts?: {label, value}[]` (up to 2)

### 46 · Centered "Thank you!" + three contacts
- `title?: string` · `contacts?: string[]` (up to 3 single-line values)

### 47 · Split closing (eyebrow + big title + contacts)
- `title?: string` (small eyebrow) · `subtitle?: string` (large title) · `contacts?: {label, value}[]` (up to 3)

### 48 · Big closing statement — blue-section background
- `title?: string` · `contacts?: {label, value}[]` (up to 3 columns)

### 49 · Split closing + photo
- `title?: string` · `body?: string` · `email?: string`

```tsx
<Slide46 title="Thank you!" contacts={["hello@vinta.com.br", "vinta.com.br", "@vintasoftware"]} />
```

---

## Back cover — 50

Full-bleed closing image, no text. Left un-parametrized; use as-is for a back cover, or copy it and
swap the `<Photo src>`.
