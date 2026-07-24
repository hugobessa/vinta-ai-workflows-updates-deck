import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 42" };

export interface Slide42Person {
  /** Member name. */
  name: string;
  /** Role under the name (blue). */
  role: string;
}

export interface Slide42Props {
  /** Heading on the left (blue). Use `\n` for line breaks. */
  title?: string;
  /** Supporting paragraph on the left (black). Use `\n` for line breaks. */
  body?: string;
  /** Up to 6 team members (3×2 grid). Extra items are ignored. */
  people?: Slide42Person[];
}

/** Members grouped into three flowing columns (top y + the member indices in each), so a
 *  taller name pushes the member below it in its column down instead of overlapping it. */
const COLUMNS = [
  { x: 821, y: 399.8, rows: [0, 3] },
  { x: 1192.5, y: 399.8, rows: [1, 4] },
  { x: 1564, y: 399.8, rows: [2, 5] },
];
/** Vertical pitch between the two rows, and the slot the name reserves before its role. */
const ROW_PITCH = 437;
const NAME_SLOT = 56.2;

// Parametrized reproduction of the official template's Slide 42 (team grid).
export default function Slide42({
  title = "Insert long\ntext here",
  body = "Lorem ipsum dolor sit amet\nconsectetur adipiscing elit etiam\nnec suscipit dui sed cursus nibh id\nrisus ultrices convallis phasellus\nvel tristique diam.",
  people = [
    { name: "Name", role: "Insert role here" },
    { name: "Name", role: "Insert role here" },
    { name: "Name", role: "Insert role here" },
    { name: "Name", role: "Insert role here" },
    { name: "Name", role: "Insert role here" },
    { name: "Name", role: "Insert role here" },
  ],
}: Slide42Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-603b384546.png" /></Place>
      <Place x={811} y={106} w={260} h={260}><Photo src="img-11d61010f2.png" /></Place>
      <Place x={811} y={544} w={260} h={260}><Photo src="img-11d61010f2.png" /></Place>
      <Place x={1182.5} y={106} w={260} h={260}><Photo src="img-e2f76a33b8.png" /></Place>
      <Place x={1182.5} y={544} w={260} h={260}><Photo src="img-e2f76a33b8.png" /></Place>
      <Place x={1554} y={106} w={260} h={260}><Photo src="img-67fc2595dc.png" /></Place>
      <Place x={106} y={403.02} w={622.28} h={328}><Photo src="img-c6e9bbff52.png" /></Place>
      <Place x={1554} y={544} w={260} h={260}><Photo src="img-67fc2595dc.png" /></Place>
      <Place x={0.54} y={0.03} w={104.32} h={103.75}><Shape n={2} fit="cover" flipX flipY /></Place>
      <Place x={104.75} y={0} w={104.25} h={103.78}><Shape n={13} fit="cover" flipX flipY /></Place>
      <Place x={0} y={103.56} w={106.02} h={104.29}><Shape n={21} fit="cover" flipX flipY /></Place>
      {/* Title + body flow in one Place; the title's minHeight reserves its slot, so a taller title pushes the body down instead of covering it. */}
      <Place x={101} y={374.4} w={514}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={487} style={{ minHeight: 238.4 }}>{title}</Text>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={514}>{body}</Text>
      </Place>
      {COLUMNS.map((col) => (
        <Place key={col.x} x={col.x} y={col.y} w={240}>
          {col.rows.map((idx, r) => {
            const p = people[idx];
            if (p == null) return null;
            return (
              <div key={idx} style={{ minHeight: r < col.rows.length - 1 ? ROW_PITCH : undefined }}>
                <Text size={30.7} weight={700} color="#000000" align="center" leading={1.32} style={{ minHeight: NAME_SLOT }}>{p.name}</Text>
                <Text size={24.2} weight={500} color="#0052FF" align="center" leading={1.32}>{p.role}</Text>
              </div>
            );
          })}
        </Place>
      ))}
    </Slide>
  );
}
