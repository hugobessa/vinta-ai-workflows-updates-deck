import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 10" };

export interface Slide10Props {
  /** Heading at the top left (black). */
  title?: string;
  /** Intro paragraph under the heading (black). Use `\n` for line breaks. */
  intro?: string;
  /** Up to 4 numbered blue items (2×2). Extra items are ignored. */
  items?: string[];
}

/** Numbered items grouped into two flowing columns (top y + the item indices in each),
 *  so a taller item pushes the one below it in its column down instead of overlapping it. */
const COLUMNS = [
  { x: 101, y: 473.1, rows: [0, 1] },
  { x: 1246.6, y: 473.1, rows: [2, 3] },
];
/** Vertical pitch between rows — each non-last item reserves it, so default positions are unchanged. */
const ROW_PITCH = 259.5;

// Parametrized reproduction of the official template's Slide 10 (numbered list).
export default function Slide10({
  title = "Insert title here",
  intro = "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit etiam nec suscipit dui sed cursus\nnibh id risus ultrices convallis .",
  items = ["01. Text", "02. Text", "03. Text", "04. Text"],
}: Slide10Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1672.44} y={123.22} w={123.51} h={122.76}><Photo src="img-d3776cb9c0.png" /></Place>
      <Place x={1672.63} y={0} w={123.3} h={123.21}><Photo src="img-2b09489048.png" /></Place>
      <Place x={1795.95} y={123.21} w={123.61} h={122.88}><Photo src="img-f7818b614a.png" /></Place>
      {/* Title + intro flow in one Place; the title's minHeight reserves its original slot, so a taller title pushes the intro down instead of covering it. */}
      <Place x={101} y={126.4} w={760}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={760} style={{ minHeight: 105.7 }}>{title}</Text>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={706}>{intro}</Text>
      </Place>
      {COLUMNS.map((col) => (
        <Place key={col.x} x={col.x} y={col.y} w={349}>
          {col.rows.map((idx, r) => (
            <Text
              key={idx}
              size={64.5}
              weight={700}
              color="#0052FF"
              leading={1.14}
              maxWidth={349}
              style={r < col.rows.length - 1 ? { minHeight: ROW_PITCH } : undefined}
            >
              {items[idx]}
            </Text>
          ))}
        </Place>
      ))}
    </Slide>
  );
}
