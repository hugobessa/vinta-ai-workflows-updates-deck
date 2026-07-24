import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 07" };

export interface Slide07Meta {
  /** Small upper label, e.g. "Cliente". */
  label: string;
  /** Value under the label, e.g. "PlusPlus". */
  value: string;
}

export interface Slide07Props {
  /** Cover title (white). Use `\n` for line breaks. */
  title?: string;
  /** Up to 3 label/value pairs above the title. Extra items are ignored. */
  meta?: Slide07Meta[];
}

/** Fixed meta slots — left edge + max line length, preserved from the original. */
const META_POS = [
  { x: 101, max: 200 },
  { x: 265, max: 384 },
  { x: 688, max: 200 },
];

// Parametrized reproduction of the official template's Slide 07 (cover title over photo).
export default function Slide07({
  title = "Click here\nto edit the text",
  meta = [
    { label: "Client", value: "PlusPlus" },
    { label: "Email", value: "contact@vintasoftware.com" },
    { label: "Date", value: "January 2023" },
  ],
}: Slide07Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-b9186cf293.png" /></Place>
      <Place x={0} y={486} w={1200.69} h={594}><Photo src="img-71cac86e17.png" /></Place>
      <Place x={106} y={602} w={766} h={70}><Photo src="img-9aa9c6d1e5.png" /></Place>
      <Place x={1664} y={116} w={154.94} h={154}><Shape n={3} fit="cover" /></Place>
      {meta.slice(0, 3).map((m, i) => (
        <Place key={i} x={META_POS[i].x} y={608.8}>
          <Text size={23.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={META_POS[i].max}>
            {`${m.label}\n${m.value}`}
          </Text>
        </Place>
      ))}
      <Place x={101} y={738.9}>
        <Text size={93.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={987}>{title}</Text>
      </Place>
    </Slide>
  );
}
