import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 12" };

export interface Slide12Stat {
  /** Big number, e.g. "200+". */
  value: string;
  /** Caption under the number. Use `\n` for line breaks. */
  caption: string;
}

export interface Slide12Props {
  /** Heading on the blue panel (white). */
  title?: string;
  /** Two supporting paragraphs (white). Use `\n` for line breaks. */
  body?: string[];
  /** Up to 4 metrics on the right (2×2). Extra items are ignored. */
  stats?: Slide12Stat[];
}

/** Metrics grouped into two flowing columns (top y + the metric indices in each), so a taller
 *  value/caption pushes the metric below it in its column down instead of overlapping it. */
const COLUMNS = [
  { x: 986, y: 282.6, rows: [0, 2] },
  { x: 1423, y: 282.6, rows: [1, 3] },
];
/** Per-metric value/caption max widths, preserved from the original. */
const STAT_W = [
  { vMax: 269, cMax: 272 },
  { vMax: 205, cMax: 200 },
  { vMax: 301, cMax: 205 },
  { vMax: 353, cMax: 200 },
];
/** Vertical pitch between the two rows, and the slot the value reserves before its caption. */
const ROW_PITCH = 299.8;
const VALUE_SLOT = 112.1;

// Parametrized reproduction of the official template's Slide 12 (stats + text).
export default function Slide12({
  title = "Text here",
  body = [
    "Iaculis scelerisque nisl nisl ut etiam\neget interdum tortor enim enim quis\npurus orci eget est elit orci tempus sit\nfringilla porttitor lacinia vitae.",
    "accumsan auctor sit ornare tempor\nlectus volutpat id mauris nullam\nvenenatis rutrum adipiscing egestas\nviverra quis morbi leo pretium libero\nvelit nulla eget et ornare gravida.",
  ],
  stats = [
    { value: "200+", caption: "Worldwide offices." },
    { value: "85+", caption: "Team\nmembers" },
    { value: "+10M", caption: "Capital raised" },
    { value: "+500K", caption: "Active users" },
  ],
}: Slide12Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-b0b2a55a5f.png" /></Place>
      <Place x={990.73} y={255.69} w={267} h={164}><Photo src="img-7f082302ab.png" /></Place>
      <Place x={990.73} y={555.44} w={279} h={164}><Photo src="img-fd6672213e.png" /></Place>
      <Place x={1427.73} y={255.69} w={212} h={164}><Photo src="img-42a3ff017b.png" /></Place>
      <Place x={1427.73} y={555.44} w={342} h={164}><Photo src="img-0ea3b70290.png" /></Place>
      <Place x={106} y={264.07} w={565} h={447}><Photo src="img-fee6f42770.png" /></Place>
      <Place x={1668.67} y={959.41} w={125.62} h={126}><Shape n={4} fit="cover" /></Place>
      <Place x={1794} y={959.22} w={126} h={126.19}><Shape n={8} fit="cover" /></Place>
      <Place x={1794.32} y={834.52} w={125.67} h={124.96}><Shape n={19} fit="cover" /></Place>
      <Place x={1823.52} y={834.52} w={66.68} h={29.18}><Photo src="img-28ba267fe3.png" /></Place>
      {/* Title + both paragraphs flow in one Place; each minHeight reserves its slot, so a taller title/paragraph pushes what's below it down instead of covering it. */}
      <Place x={101} y={284.5} w={558}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={441} style={{ minHeight: 142.9, marginLeft: 3 }}>{title}</Text>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={558} style={{ minHeight: 200 }}>{body[0]}</Text>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={539}>{body[1]}</Text>
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
