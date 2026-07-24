import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

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

/** Fixed 2×2 metric slots — value + caption position/width, preserved from the original. */
const STAT_POS = [
  { x: 101, vy: 470.9, vMax: 269, cy: 583, cMax: 261 },
  { x: 538, vy: 470.9, vMax: 205, cy: 583, cMax: 261 },
  { x: 101, vy: 735.9, vMax: 301, cy: 848, cMax: 261 },
  { x: 538, vy: 735.9, vMax: 353, cy: 848, cMax: 261 },
];

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
      <Place x={101} y={135.4}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={751}>{title}</Text>
      </Place>
      <Place x={101} y={260.7}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={619}>{body}</Text>
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
