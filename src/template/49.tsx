import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 49" };

export interface Slide49Props {
  /** Closing title (black). */
  title?: string;
  /** Supporting paragraph (black). Use `\n` for line breaks. */
  body?: string;
  /** Contact email on the photo (white, centered). */
  email?: string;
}

// Parametrized reproduction of the official template's Slide 49 (thanks / closing, split + photo).
export default function Slide49({
  title = "Thank you",
  body = "Lorem ipsum dolor sit amet consecteturolemer\nadipiscing elit etiam nec suscipit dui sed",
  email = "contact@vintasoftware.com",
}: Slide49Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={984.7} h={1080}><Photo src="img-8724dd66b6.png" inner={{ x: 0, y: 0, w: 1919.95, h: 1080 }} /></Place>
      <Place x={106} y={139} w={183} h={41.94}><Photo src="img-f950ca4ad1.png" /></Place>
      <Place x={1160.3} y={0} w={759.71} h={1080}><Photo src="img-ee49effe29.png" inner={{ x: -378.63, y: 0, w: 1620.44, h: 1080 }} /></Place>
      {/* Title + body flow in one Place; the title's minHeight reserves its original slot, so a taller title pushes the body down instead of covering it. */}
      <Place x={101} y={280.9} w={748}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={587} style={{ minHeight: 142 }}>{title}</Text>
        <Text size={29} weight={400} color="#000000" leading={1.32} maxWidth={748}>{body}</Text>
      </Place>
      <Place x={127} y={887.1} w={600}>
        <Text size={33.9} weight={700} color="#FFFFFF" align="center" leading={1.32}>{email}</Text>
      </Place>
    </Slide>
  );
}
