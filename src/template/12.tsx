import { Photo, Place, Shape, Slide, Text } from "@/lib";
import { Fragment } from "react";

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

/** Fixed 2×2 metric slots — value + caption position/width, preserved from the original. */
const STAT_POS = [
  { x: 986, vy: 282.6, vMax: 269, cy: 394.7, cMax: 272 },
  { x: 1423, vy: 282.6, vMax: 205, cy: 394.7, cMax: 200 },
  { x: 986, vy: 582.4, vMax: 301, cy: 694.4, cMax: 205 },
  { x: 1423, vy: 582.4, vMax: 353, cy: 694.4, cMax: 200 },
];

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
      <Place x={104} y={284.5}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={441}>{title}</Text>
      </Place>
      <Place x={101} y={427.4}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={558}>{body[0]}</Text>
      </Place>
      <Place x={101} y={627.4}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={539}>{body[1]}</Text>
      </Place>
      {stats.slice(0, 4).map((s, i) => {
        const p = STAT_POS[i];
        return (
          <Fragment key={i}>
            <Place x={p.x} y={p.vy}>
              <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={p.vMax}>{s.value}</Text>
            </Place>
            <Place x={p.x} y={p.cy}>
              <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={p.cMax}>{s.caption}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
