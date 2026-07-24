import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 06" };

export interface Slide06Props {
  /** First title line (black). */
  line1?: string;
  /** Second title line (blue accent). */
  line2?: string;
}

// Parametrized reproduction of the official template's Slide 06 (section divider).
export default function Slide06({
  line1 = "Click here",
  line2 = "to edit the text",
}: Slide06Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-98a2504caf.png" /></Place>
      <Place x={1637} y={820} w={138.98} h={139.8}><Photo src="img-bb66fcf0a9.png" /></Place>
      <Place x={79} y={60} w={255} h={254.2}><Photo src="img-16d705fbcc.png" /></Place>
      {/* Both title lines flow in one Place; line1's minHeight reserves its slot, so a taller line1 pushes line2 down instead of covering it. */}
      <Place x={101} y={746.7} w={1200}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={1200} style={{ minHeight: 144 }}>{line1}</Text>
        <Text size={93.6} weight={700} color="#0052FF" leading={1.14} maxWidth={1200}>{line2}</Text>
      </Place>
    </Slide>
  );
}
