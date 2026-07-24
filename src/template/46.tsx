import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 46" };

export interface Slide46Props {
  /** Centered closing title (white). */
  title?: string;
  /** Up to 3 single-line contact values along the bottom. Extra items are ignored. */
  contacts?: string[];
}

/** Fixed contact slots — left edge + max width, preserved from the original. */
const POS = [
  { x: 235, max: 520 },
  { x: 804, max: 465 },
  { x: 1419, max: 257 },
];

// Parametrized reproduction of the official template's Slide 46 (thanks / closing, centered).
export default function Slide46({
  title = "Thank you!",
  contacts = ["contact@vintasoftware.com", "Other contact info", "vinta.com.br"],
}: Slide46Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-a2ee98ebef.png" /></Place>
      <Place x={860.16} y={903.65} w={199.68} h={45.76}><Photo src="img-1e0de2cc8d.png" /></Place>
      <Place x={0} y={430.3} w={1920}>
        <Text size={124.8} weight={700} color="#FFFFFF" align="center" leading={1.14}>{title}</Text>
      </Place>
      {contacts.slice(0, 3).map((c, i) => (
        <Place key={i} x={POS[i].x} y={690.7}>
          <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={POS[i].max}>{c}</Text>
        </Place>
      ))}
    </Slide>
  );
}
