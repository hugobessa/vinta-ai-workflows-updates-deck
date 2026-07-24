import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 13" };

export interface Slide13Stat {
  /** Big number, e.g. "200+". */
  value: string;
  /** Caption under the number. Use `\n` for line breaks. */
  caption: string;
}

export interface Slide13Props {
  /** Heading (black). */
  title?: string;
  /** Intro paragraph under the title (black). Use `\n` for line breaks. */
  body?: string;
  /** Up to 4 metrics (2×2). Extra items are ignored. */
  stats?: Slide13Stat[];
}

/** Metrics grouped into two flowing columns (top y + the metric indices in each), so a taller
 *  value/caption pushes the metric below it in its column down instead of overlapping it. */
const COLUMNS = [
  { x: 101, y: 470.9, rows: [0, 2] },
  { x: 538, y: 470.9, rows: [1, 3] },
];
/** Per-metric value/caption max widths, preserved from the original. */
const STAT_W = [
  { vMax: 269, cMax: 261 },
  { vMax: 205, cMax: 261 },
  { vMax: 301, cMax: 261 },
  { vMax: 353, cMax: 261 },
];
/** Vertical pitch between the two rows, and the slot the value reserves before its caption. */
const ROW_PITCH = 265;
const VALUE_SLOT = 112.1;

// Parametrized reproduction of the official template's Slide 13 (stats + illustration).
export default function Slide13({
  title = "Insert text here",
  body = "Lorem ipsum dolor sit amet, consecteturd\ncursus nibh id risus ultrices convallis\nphasellus vel tristique diam ham placerat.",
  stats = [
    { value: "200+", caption: "Insert text here" },
    { value: "85+", caption: "Insert text here" },
    { value: "+10M", caption: "Insert text here" },
    { value: "+500K", caption: "Insert text here" },
  ],
}: Slide13Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-603b384546.png" /></Place>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-603b384546.png" /></Place>
      <Place x={1274} y={0} w={646} h={1080}><Photo src="img-38db0dfe14.png" /></Place>
      <Place x={106} y={134} w={741} h={245}><Photo src="img-012fef3689.png" /></Place>
      <Place x={990} y={184} w={778} h={692.24}><Photo src="img-9518714658.png" /></Place>
      <Place x={1647} y={635} w={242.28} h={240.98}><Photo src="img-9bc85c4d8c.png" /></Place>
      {/* Title + body flow in one Place; the title's minHeight reserves its original slot, so a taller title pushes the body down instead of covering it. */}
      <Place x={101} y={135.4} w={751}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={751} style={{ minHeight: 125.3 }}>{title}</Text>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={619}>{body}</Text>
      </Place>
      {COLUMNS.map((col) => (
        <Place key={col.x} x={col.x} y={col.y} w={400}>
          {col.rows.map((idx, r) => {
            const s = stats[idx];
            if (s == null) return null;
            return (
              <div key={idx} style={{ minHeight: r < col.rows.length - 1 ? ROW_PITCH : undefined }}>
                <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={STAT_W[idx].vMax} style={{ minHeight: VALUE_SLOT }}>{s.value}</Text>
                <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={STAT_W[idx].cMax}>{s.caption}</Text>
              </div>
            );
          })}
        </Place>
      ))}
    </Slide>
  );
}
