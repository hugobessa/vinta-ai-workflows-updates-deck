import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 22" };

export interface Slide22Stat {
  /** Big number, e.g. "32+". */
  value: string;
  /** Caption under the number. Use `\n` for line breaks. */
  caption: string;
}

export interface Slide22Props {
  /** Up to 3 large metrics across the top. Extra items are ignored. */
  stats?: Slide22Stat[];
  /** Bottom-left heading (black). Use `\n` for line breaks. */
  title?: string;
  /** Bottom-right paragraph (black). Use `\n` for line breaks. */
  body?: string;
}

/** Fixed top-row metric slots — value + caption position/width, preserved from the original. */
const STAT_POS = [
  { x: 101, vy: 168.8, vMax: 340, cy: 346.7, cMax: 244 },
  { x: 714, vy: 168.8, vMax: 449, cy: 346.7, cMax: 244 },
  { x: 1453, vy: 168.8, vMax: 389, cy: 346.7, cMax: 244 },
];

// Parametrized reproduction of the official template's Slide 22 (big stats + text).
export default function Slide22({
  stats = [
    { value: "32+", caption: "Insert text here" },
    { value: "500+", caption: "Insert text here" },
    { value: "10M", caption: "Insert text here" },
  ],
  title = "Insert text\nhere",
  body = "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit scelerisque\nfacilisis vel porta quisque cursus\nvulputate gravida interdum mollis ac\nvarius consectetur.",
}: Slide22Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={486.03}><Photo src="img-872308a9c5.png" inner={{ x: 0, y: -593.96, w: 1920, h: 1079.99 }} /></Place>
      <Place x={106} y={34.03} w={324} h={228}><Photo src="img-5b7cebde01.png" /></Place>
      <Place x={719} y={34.03} w={450} h={228}><Photo src="img-1e29206b10.png" /></Place>
      <Place x={1458} y={34.03} w={355} h={228}><Photo src="img-61ec18f24a.png" /></Place>
      {stats.slice(0, 3).map((s, i) => {
        const p = STAT_POS[i];
        return (
          // Value + caption flow in one Place; the value's minHeight reserves its slot, so a taller value pushes the caption down instead of covering it.
          <Place key={i} x={p.x} y={p.vy} w={p.vMax}>
            <Text size={158.1} weight={700} color="#FFFFFF" leading={1.14} maxWidth={p.vMax} style={{ minHeight: p.cy - p.vy }}>{s.value}</Text>
            <Text size={22.6} weight={500} color="#FFFFFF" leading={1.32} maxWidth={p.cMax}>{s.caption}</Text>
          </Place>
        );
      })}
      <Place x={101} y={655.8}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{title}</Text>
      </Place>
      <Place x={1186} y={672.6}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={570}>{body}</Text>
      </Place>
    </Slide>
  );
}
