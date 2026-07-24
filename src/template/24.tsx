import { PieChart, type PieDatum, Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 24" };

export interface Slide24Datum extends PieDatum {
  /** Legend text for this slice. */
  label?: string;
}

export interface Slide24Props {
  /** Heading on the left (black). Use `\n` for line breaks. */
  title?: string;
  /** Pie slices (value + color). Sizes, on-slice `%` and the legend all derive from this. */
  data?: Slide24Datum[];
}

/** Fixed legend row anchors — the dot sits here; its label follows at ~338.4 (original). */
const LEGEND_POS = [
  { x: 288.4, y: 489.6 },
  { x: 288.4, y: 568.6 },
  { x: 288.4, y: 647.6 },
];

// Parametrized reproduction of the official template's Slide 24 (pie chart + legend).
export default function Slide24({
  title = "Insert text\nhere",
  data = [
    { label: "Insert text here", value: 1, color: "#0052ff", labelColor: "#ffffff" },
    { label: "Insert text here", value: 1, color: "#0b1220", labelColor: "#ffffff" },
    { label: "Insert text here", value: 1, color: "#d9d9d9", labelColor: "#000000" },
  ],
}: Slide24Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1560.77} y={-2.25} w={359.23} h={358.89}><Photo src="img-12269fea93.png" inner={{ x: -1560.75, y: 0, w: 1919.97, h: 1079.99 }} /></Place>
      <Place x={0} y={-2.25} w={359.23} h={358.89}><Photo src="img-12269fea93.png" inner={{ x: 0, y: -20.84, w: 1919.97, h: 1079.95 }} /></Place>
      <Place x={0} y={700.25} w={359.23} h={379.75}><Photo src="img-12269fea93.png" inner={{ x: 0, y: -593.63, w: 1919.97, h: 1079.96 }} /></Place>
      <Place x={879} y={225.95} w={680} h={680}>
        <PieChart data={data} size={680} />
      </Place>
      <Place x={276.4} y={237.1}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{title}</Text>
      </Place>
      {data.slice(0, 3).map((d, i) => (
        <Place key={i} x={LEGEND_POS[i].x} y={LEGEND_POS[i].y}>
          <div className="flex items-center" style={{ gap: 20 }}>
            <span style={{ width: 30, height: 30, borderRadius: 9999, background: d.color, flexShrink: 0 }} />
            <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={261}>{d.label}</Text>
          </div>
        </Place>
      ))}
    </Slide>
  );
}
