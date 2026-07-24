import { BarChart, type BarDatum, Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 23" };

export interface Slide23Props {
  /** Heading on the right (black). Use `\n` for line breaks. */
  title?: string;
  /** Paragraph under the title (black). Use `\n` for line breaks. */
  body?: string;
  /** Horizontal-bar data (top → bottom). Bars & the value axis scale to the data. */
  data?: BarDatum[];
  /** Value-axis upper bound. Auto-computed from the data when omitted. */
  max?: number;
}

// Parametrized reproduction of the official template's Slide 23 (horizontal bar chart).
export default function Slide23({
  title = "Insert text\nhere",
  body = "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit scelerisque\nfacilisis vel porta quisque cursus\nvulputate gravida interdum mollis ac\nvarius consectetu.",
  data = [
    { label: "Q4", value: 100, valueLabel: "$100,000 USD", color: "#0052ff" },
    { label: "Q3", value: 64, valueLabel: "$64,000 USD", color: "#0040c8" },
    { label: "Q2", value: 48, valueLabel: "$48,000 USD", color: "#2e6bff" },
    { label: "Q1", value: 25, valueLabel: "$25,000 USD", color: "#a8c5f5" },
  ],
  max,
}: Slide23Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={130.07} h={132.78}><Photo src="img-c2ae468178.png" /></Place>
      <Place x={1691.95} y={0} w={114.09} h={113.46}><Photo src="img-6866879b7e.png" /></Place>
      <Place x={1805.65} y={0.05} w={114.33} h={113.32}><Photo src="img-54d336f9bc.png" /></Place>
      <Place x={1805.65} y={113.38} w={114.35} h={113.74}><Photo src="img-a8a2646f09.png" /></Place>
      <Place x={1578.07} y={0} w={114.01} h={113.49}><Photo src="img-8f485ac52f.png" /></Place>
      <Place x={94.61} y={239.23} w={1109.63} h={686.11}>
        <BarChart data={data} max={max} width={1109.63} height={686.11} />
      </Place>
      <Place x={1314} y={338.2}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{title}</Text>
      </Place>
      <Place x={1314} y={564.2}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={510}>{body}</Text>
      </Place>
    </Slide>
  );
}
