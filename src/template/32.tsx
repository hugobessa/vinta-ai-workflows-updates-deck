import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 32" };

export interface Slide32Props {
  /** Heading (black). Use `\n` for line breaks. */
  title?: string;
  /** Up to 6 labels next to the badges. Extra items are ignored. */
  labels?: string[];
  /** Large graphic on the right (the slide's subject). */
  graphic?: string;
}

/** Fixed label slots — position, preserved from the original. */
const LABEL_POS = [
  { x: 182, y: 534.2 },
  { x: 604, y: 534.2 },
  { x: 183, y: 671.8 },
  { x: 604, y: 671.8 },
  { x: 182, y: 809.8 },
  { x: 604, y: 809.8 },
];

// Parametrized reproduction of the official template's Slide 32 (labels + badges + graphic).
export default function Slide32({
  title = "Insert very\n long text here",
  labels = ["Text", "Text", "Text", "Text", "Text", "Text"],
  graphic = "img-9e74fef173.png",
}: Slide32Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={882.12} y={169.78} w={892} h={763.3}><Photo src={graphic} /></Place>
      <Place x={106} y={524.43} w={191.95} h={54}><Photo src="img-eb60db2e06.png" /></Place>
      <Place x={528} y={524.43} w={192.1} h={54}><Photo src="img-15430290fd.png" /></Place>
      <Place x={106} y={662.01} w={192.66} h={54}><Photo src="img-5f5067dbf5.png" /></Place>
      <Place x={528} y={662.01} w={191.87} h={54}><Photo src="img-d76739dc30.png" /></Place>
      <Place x={106} y={800.01} w={191.83} h={54}><Photo src="img-cf6564acbe.png" /></Place>
      <Place x={528} y={800.01} w={191.83} h={54}><Photo src="img-e7cca89209.png" /></Place>
      <Place x={101} y={246.4}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{title}</Text>
      </Place>
      {labels.slice(0, 6).map((label, i) => (
        <Place key={i} x={LABEL_POS[i].x} y={LABEL_POS[i].y}>
          <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={200}>{label}</Text>
        </Place>
      ))}
    </Slide>
  );
}
