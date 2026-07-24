import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 05" };

export interface Slide05Meta {
  /** Small upper label, e.g. "Cliente". */
  label: string;
  /** Value under the label, e.g. "PlusPlus". */
  value: string;
}

export interface Slide05Props {
  /** Cover title (black). Use `\n` for line breaks. */
  title?: string;
  /** Up to 3 label/value pairs along the footer. Extra items are ignored. */
  meta?: Slide05Meta[];
}

/** Fixed footer slots — left edge + max line length, preserved from the original. */
const META_POS = [
  { x: 101, max: 200 },
  { x: 657, max: 384 },
  { x: 1592, max: 200 },
];

// Parametrized reproduction of the official template's Slide 05 (cover title).
export default function Slide05({
  title = "Click here\nto edit the text",
  meta = [
    { label: "Client", value: "PlusPlus" },
    { label: "Email", value: "contact@vintasoftware.com" },
    { label: "Date", value: "January 2023" },
  ],
}: Slide05Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-08df3f6396.png" /></Place>
      <Place x={1616} y={298} w={187.56} h={187.83}><Shape n={8} fit="cover" /></Place>
      <Place x={1431} y={485} w={187.43} h={186.71}><Shape n={9} fit="cover" /></Place>
      <Place x={1616} y={111} w={187.51} h={186.97}><Shape n={10} fit="cover" /></Place>
      <Place x={1241} y={298} w={189.78} h={186.53}><Shape n={15} fit="cover" /></Place>
      <Place x={106} y={116} w={225} h={52}><Photo src="img-980bd1d188.png" /></Place>
      <Place x={106} y={907} w={1739} h={70}><Photo src="img-6779401282.png" /></Place>
      <Place x={101} y={317.9}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={736}>{title}</Text>
      </Place>
      {meta.slice(0, 3).map((m, i) => (
        <Place key={i} x={META_POS[i].x} y={913.8}>
          <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={META_POS[i].max}>
            {`${m.label}\n${m.value}`}
          </Text>
        </Place>
      ))}
    </Slide>
  );
}
