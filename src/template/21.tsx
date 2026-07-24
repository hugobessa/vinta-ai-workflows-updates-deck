import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 21" };

export interface Slide21Props {
  /** Title (white). Use `\n` for line breaks. */
  title?: string;
  /** Supporting paragraph (white). Use `\n` for line breaks. */
  body?: string;
  /** Hero photo `src` on the right. */
  photo?: string;
}

// Parametrized reproduction of the official template's Slide 21 (big statement + side photo).
export default function Slide21({
  title = "Insert text\nhere",
  body = "Lorem ipsum dolor sit amet consectetur\nadipiscing elit etiam nec suscipit dui sed\ncursus nibh id risus ultrices convallis\nphasellus vel tristique diam nam placerat.",
  photo = "img-9374d01d1d.png",
}: Slide21Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-34260598bb.png" /></Place>
      <Place x={1143} y={300} w={776} h={780}><Photo src={photo} /></Place>
      {/* Title + body flow in one Place; the title's minHeight reserves its original slot, so a taller title pushes the body down instead of covering it. */}
      <Place x={101} y={326.9} w={639}>
        <Text size={93.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={639} style={{ minHeight: 276.8 }}>{title}</Text>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={619}>{body}</Text>
      </Place>
    </Slide>
  );
}
