import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 14" };

export interface Slide14Item {
  /** Small blue index label, e.g. "01". */
  number: string;
  /** Row heading (black). */
  title: string;
}

export interface Slide14Props {
  /** Up to 6 numbered rows (2 columns × 3 rows). Extra items are ignored. */
  items?: Slide14Item[];
}

/** Numbered rows grouped into two flowing columns, so a taller heading pushes the row below
 *  it in its column down instead of overlapping it. The number sits in a fixed left gutter
 *  beside the heading. Positions preserved from the original. */
const COLUMNS = [
  { numX: 195, y: 254.8, rows: [0, 1, 2] },
  { numX: 1081, y: 254.8, rows: [3, 4, 5] },
];
/** Vertical pitch between rows — each non-last row reserves it, so default positions are unchanged. */
const ROW_PITCH = 210;
/** Number gutter width (heading x − number x) and the number's downward nudge within a row. */
const NUM_GUTTER = 76.3;
const NUM_TOP = 13.2;

// Parametrized reproduction of the official template's Slide 14 (numbered rows).
export default function Slide14({
  items = [
    { number: "01", title: "Insert text here" },
    { number: "02", title: "Insert text here" },
    { number: "03", title: "Insert text here" },
    { number: "04", title: "Insert text here" },
    { number: "05", title: "Insert text here" },
    { number: "06", title: "Insert text here" },
  ],
}: Slide14Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1535.22} y={0} w={384.77} h={382.76}><Photo src="img-e60976291e.png" inner={{ x: -1535.15, y: 0, w: 1919.93, h: 1079.99 }} /></Place>
      <Place x={0} y={697.24} w={587.64} h={382.76}><Photo src="img-e60976291e.png" inner={{ x: -11.56, y: -591.23, w: 1919.88, h: 1079.96 }} /></Place>
      <Place x={1086} y={659.99} w={684.75} h={74}><Photo src="img-ee4010a0a2.png" /></Place>
      <Place x={1086} y={450} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={1086} y={240} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={200} y={659.99} w={684.75} h={74}><Photo src="img-ee4010a0a2.png" /></Place>
      <Place x={200} y={450} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={200} y={240} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      {COLUMNS.map((col) => (
        <Place key={col.numX} x={col.numX} y={col.y} w={690}>
          {col.rows.map((idx, r) => {
            const item = items[idx];
            if (item == null) return null;
            return (
              <div key={idx} style={{ position: "relative", minHeight: r < col.rows.length - 1 ? ROW_PITCH : undefined }}>
                <Text size={24.2} weight={500} color="#0052FF" leading={1.32} maxWidth={200} style={{ position: "absolute", left: 0, top: NUM_TOP }}>{item.number}</Text>
                <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={548} style={{ marginLeft: NUM_GUTTER }}>{item.title}</Text>
              </div>
            );
          })}
        </Place>
      ))}
    </Slide>
  );
}
