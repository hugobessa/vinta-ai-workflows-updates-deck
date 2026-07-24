import { ColumnChart, type ColumnGroup, type ColumnSeries, Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 25" };

export interface Slide25Props {
  /** Centered heading (black). */
  title?: string;
  /** Legend series (name + color), left → right within each group. */
  series?: ColumnSeries[];
  /** One category per group; each `values` entry lines up with `series`. */
  groups?: ColumnGroup[];
  /** Value-axis upper bound. Auto-computed from the data when omitted. */
  max?: number;
}

// Parametrized reproduction of the official template's Slide 25 (grouped column chart).
export default function Slide25({
  title = "Insert text here",
  series = [
    { name: "Period 1", color: "#0b1220" },
    { name: "Period 2", color: "#0052ff" },
  ],
  groups = [
    { label: "Team 1", values: [24, 89] },
    { label: "Team 2", values: [36, 24] },
    { label: "Team 3", values: [12, 37] },
    { label: "Team 4", values: [38, 63] },
  ],
  max,
}: Slide25Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={344.71} y={206.25} w={1230.59} h={760.91}>
        <ColumnChart series={series} groups={groups} max={max} width={1230.59} height={760.91} />
      </Place>
      <Place x={110.85} y={0} w={112.64} h={112.16}><Shape n={16} fit="cover" /></Place>
      <Place x={-1.76} y={0} w={112.9} h={112}><Shape n={22} fit="cover" /></Place>
      <Place x={-1.8} y={111.75} w={112.41} h={112.9}><Shape n={23} fit="cover" /></Place>
      <Place x={0} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={742.99} y={1006.43} w={373.84} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.17, h: 461.86 }} /></Place>
      <Place x={1108.83} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={1851.82} y={1006.43} w={68.18} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.1, h: 461.86 }} /></Place>
      <Place x={0} y={92.4} w={1920}>
        <Text size={71} weight={700} color="#000000" align="center" leading={1.14}>{title}</Text>
      </Place>
    </Slide>
  );
}
