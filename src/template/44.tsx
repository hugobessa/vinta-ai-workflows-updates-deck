import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 44" };

export interface Slide44Person {
  /** Role above the name (blue). */
  role: string;
  /** Member name. */
  name: string;
  /** First bio line. Use `\n` for line breaks. */
  line1: string;
  /** Second bio line. */
  line2: string;
}

export interface Slide44Props {
  /** Centered heading (black). */
  title?: string;
  /** Up to 4 team members (single row). Extra items are ignored. */
  people?: Slide44Person[];
}

/** Fixed 4-column member slots — left edge + role y, preserved from the original. */
const POS = [
  { x: 96, ry: 654.1 },
  { x: 533, ry: 654.1 },
  { x: 970, ry: 654.1 },
  { x: 1407, ry: 647.6 },
];

// Parametrized reproduction of the official template's Slide 44 (team grid).
export default function Slide44({
  title = "Insert long text here",
  people = [
    { role: "Person role", name: "Person name", line1: "Facilisi nisl interdum a eu\nmaurisole mus etiam nec", line2: "mauris dolor" },
    { role: "Person role", name: "Person name", line1: "Facilisi nisl interdum a eu\nmaurisole mus etiam nec", line2: "mauris dolor" },
    { role: "Person role", name: "Person name", line1: "Facilisi nisl interdum a eu\nmaurisole mus etiam nec", line2: "mauris dolor" },
    { role: "Person role", name: "Person name", line1: "Facilisi nisl interdum a eu\nmaurisole mus etiam nec", line2: "mauris dolor" },
  ],
}: Slide44Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={106} y={320.43} w={397} h={397}><Photo src="img-e31aca71a7.png" /></Place>
      <Place x={106.37} y={749.43} w={396.27} h={188}><Photo src="img-7262e128ad.png" /></Place>
      <Place x={543} y={320.43} w={397} h={397}><Photo src="img-1d644a05f4.png" /></Place>
      <Place x={543.37} y={749.43} w={396.27} h={188}><Photo src="img-7262e128ad.png" /></Place>
      <Place x={980} y={320.43} w={397} h={397}><Photo src="img-c91f55a786.png" /></Place>
      <Place x={980.37} y={749.43} w={396.27} h={188}><Photo src="img-7262e128ad.png" /></Place>
      <Place x={1417.37} y={749.43} w={396.27} h={188}><Photo src="img-7262e128ad.png" /></Place>
      <Place x={1417} y={320.43} w={397} h={397}><Photo src="img-d79755d588.png" /></Place>
      <Place x={1814} y={723.43} w={69.9} h={69.73}><Photo src="img-2dba8aa3da.png" /></Place>
      <Place x={36} y={250.52} w={69.9} h={69.37}><Photo src="img-4fb43b3173.png" /></Place>
      <Place x={1814} y={250.43} w={69.9} h={69.59}><Photo src="img-b4191fc33d.png" /></Place>
      <Place x={106} y={319.43} w={70.78} h={69.57}><Photo src="img-6f3b731570.png" /></Place>
      <Place x={543} y={320.43} w={70.26} h={70.09}><Photo src="img-2a11fbed3b.png" /></Place>
      <Place x={0} y={126.4} w={1920}>
        <Text size={71} weight={700} color="#000000" align="center" leading={1.14}>{title}</Text>
      </Place>
      {people.slice(0, 4).map((p, i) => {
        const s = POS[i];
        return (
          // role → name → bio lines flow in one Place; each minHeight reserves its slot, so a taller line pushes what's below it down instead of covering it.
          <Place key={i} x={s.x} y={s.ry} w={417}>
            <Text size={16.1} weight={400} color="#0052FF" align="center" leading={1.32} style={{ minHeight: 759.2 - s.ry }}>{p.role}</Text>
            <Text size={33.9} weight={700} color="#000000" align="center" leading={1.32} style={{ minHeight: 59.3 }}>{p.name}</Text>
            <Text size={24.7} weight={500} color="#000000" align="center" leading={1.32} style={{ minHeight: 73.6 }}>{p.line1}</Text>
            <Text size={24.7} weight={500} color="#000000" align="center" leading={1.32}>{p.line2}</Text>
          </Place>
        );
      })}
    </Slide>
  );
}
