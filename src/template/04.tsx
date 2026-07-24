import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 04" };

export interface Slide04Meta {
  /** Small upper label, e.g. "Cliente". */
  label: string;
  /** Value under the label, e.g. "PlusPlus". */
  value: string;
}

export interface Slide04Props {
  /** First title line (black). */
  line1?: string;
  /** Second title line (blue accent). */
  line2?: string;
  /** Up to 3 label/value pairs along the footer. Extra items are ignored. */
  meta?: Slide04Meta[];
}

/** Fixed footer slots — left edge + max line length, preserved from the original. */
const META_POS = [
  { x: 101, max: 200 },
  { x: 301, max: 384 },
  { x: 760, max: 200 },
];

// Parametrized reproduction of the official template's Slide 04 (proposal cover).
export default function Slide04({
  line1 = "Insert",
  line2 = "Title here",
  meta = [
    { label: "Client", value: "PlusPlus" },
    { label: "Email", value: "contact@vintasoftware.com" },
    { label: "Date", value: "January 2023" },
  ],
}: Slide04Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1919.7} h={1080}><Photo src="img-77255309fa.png" /></Place>
      <Place x={0} y={0} w={226} h={226.58}><Photo src="img-d940e2ad7d.png" /></Place>
      <Place x={107} y={381} w={210} h={48}><Photo src="img-bea7bafa63.png" /></Place>
      {/* Both title lines flow in one Place; line1's minHeight reserves its slot, so a taller line1 pushes line2 down instead of covering it. */}
      <Place x={102} y={505.9} w={593}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={362} style={{ minHeight: 144 }}>{line1}</Text>
        <Text size={93.6} weight={700} color="#0052FF" leading={1.14} maxWidth={593}>{line2}</Text>
      </Place>
      {meta.slice(0, 3).map((m, i) => (
        <Place key={i} x={META_POS[i].x} y={908.2}>
          <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={META_POS[i].max}>
            {`${m.label}\n${m.value}`}
          </Text>
        </Place>
      ))}
    </Slide>
  );
}
