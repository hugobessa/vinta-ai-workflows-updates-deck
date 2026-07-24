import { Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 16" };

export interface Slide16Props {
  /** Heading at the top left (blue). */
  title?: string;
  /** Up to 8 bullet items (2 columns × 4 rows). Extra items are ignored. */
  items?: string[];
}

// The list spans the footprint of the original 2×4 fixed slots, with its left edge
// (the bullets) aligned to the title at x≈158.4. `MARKER` reserves room for the native
// bullet inside that edge, so the text sits just to its right.
const MARKER = 34;
// Fixed height per item. Sized to hold up to 2 wrapped lines (2 × 32.3 × 1.32 ≈ 85px)
// plus breathing room, so a longer item never pushes the bullets below it out of place.
const ROW = 120;
const LIST = {
  x: 158.4,
  y: 370.9,
  w: 1440,
  colGap: 96,
  // Four fixed rows per column (+ slack so rounding never spills a 4th item early).
  height: ROW * 4 + 10,
};

// Parametrized reproduction of the official template's Slide 16 (bulleted list).
export default function Slide16({
  title = "Text here",
  items = [
    "Insert text here very long text to test the wrapping of the text in the list",
    "Insert text here",
    "Insert text here",
    "Insert text here",
    "Insert text here",
    "Insert text here",
    "Insert text here",
    "Insert text here",
  ],
}: Slide16Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1545.27} y={-8} w={187.12} h={186.97}><Shape n={6} fit="cover" /></Place>
      <Place x={1732.31} y={-8} w={187.51} h={186.97}><Shape n={10} fit="cover" /></Place>
      <Place x={1732.42} y={170.97} w={187.59} h={186.48}><Shape n={20} fit="cover" /></Place>
      <Place x={79.3} y={1000.75} w={0} h={0}><Shape n={2} fit="cover" /></Place>
      <Place x={79.3} y={921.62} w={0} h={0}><Shape n={13} fit="cover" /></Place>
      <Place x={158.38} y={999.87} w={0} h={0}><Shape n={21} fit="cover" /></Place>
      {/* Title + list flow in one Place; the title's minHeight reserves its slot, so a taller title pushes the whole list down instead of covering it. */}
      <Place x={LIST.x} y={199.4} w={LIST.w}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={1300} style={{ minHeight: LIST.y - 199.4 }}>{title}</Text>
        {/* Single semantic list flowing into two columns: items fill the left
            column top-to-bottom first, then spill into the right. */}
        <ul
          style={{
            columnCount: 2,
            columnGap: LIST.colGap,
            columnFill: "auto",
            height: LIST.height,
            margin: 0,
            paddingInlineStart: MARKER,
            listStyleType: "disc",
            listStylePosition: "outside",
            // The native marker inherits these; matching them to the text keeps the
            // bullet sized and colored like the copy, with wrapped lines hanging under it.
            fontSize: 32.3,
            fontWeight: 700,
            lineHeight: 1.32,
            color: "#000000",
          }}
        >
          {/* No `overflow` on the <li>: it would clip the outside list marker. The
              inner text does its own 2-line clamp, so the fixed height is never exceeded. */}
          {items.slice(0, 8).map((item, i) => (
            <li key={i} style={{ breakInside: "avoid", height: ROW }}>
              <Text
                size={32.3}
                weight={700}
                color="#000000"
                leading={1.32}
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </Place>
    </Slide>
  );
}
