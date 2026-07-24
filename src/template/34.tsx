import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 34" };

export interface Slide34Props {
  /** Heading (blue). Use `\n` for line breaks. */
  title?: string;
  /** Stacked list rows (black), rendered one per line. */
  items?: string[];
  /** Hero/content photo src (large left panel). */
  photo?: string;
}

// Parametrized reproduction of the official template's Slide 34 (blue title + stacked list + side photo).
export default function Slide34({
  title = "Insert\nlong text here",
  items = ["Text", "Text", "Text", "Text"],
  photo = "img-c66076898b.png",
}: Slide34Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={945.09} h={1080.01}><Photo src={photo} inner={{ x: -94.98, y: 0, w: 1040.07, h: 1080.01 }} /></Place>
      <Place x={1827.86} y={0} w={92.14} h={92}><Photo src="img-434b82f370.png" /></Place>
      <Place x={1736.19} y={91.81} w={92} h={92.38}><Photo src="img-ee885161a0.png" /></Place>
      {/* Title + list flow in one Place; the title's minHeight reserves its slot, so a taller
          title pushes the list down instead of covering it. The list keeps its 87.5px indent. */}
      <Place x={1022} y={139.5} w={700}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={700} style={{ minHeight: 285 }}>{title}</Text>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={650} style={{ marginLeft: 87.5 }}>{items.join("\n")}</Text>
      </Place>
    </Slide>
  );
}
