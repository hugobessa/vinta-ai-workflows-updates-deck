import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 30" };

export interface Slide30Props {
  /** Heading (blue). Use `\n` for line breaks. */
  title?: string;
  /** Body paragraph (black). Use `\n` for line breaks. */
  body?: string;
  /** Hero/content photo src (large left portrait panel). */
  photo?: string;
}

// Parametrized reproduction of the official template's Slide 30 (blue title + paragraph + side portrait photo).
export default function Slide30({
  title = "Insert very long\ntext here",
  body = "Lorem ipsum dolor sit amet, consectetur adipiscing\nelit etiam nec suscipit dui. Sed cursus nibh id risus\nultrices convallis.",
  photo = "img-49f0d0b77a.png",
}: Slide30Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={988} y={572.45} w={400.24} h={398.63}><Photo src="img-a25bfbf91d.png" inner={{ x: -987.93, y: -572.46, w: 1919.8, h: 1080.03 }} /></Place>
      <Place x={0} y={0} w={918.5} h={1080}><Photo src={photo} /></Place>
      <Place x={1430.43} y={572.45} w={400.24} h={398.63}><Photo src="img-a25bfbf91d.png" inner={{ x: -1420.15, y: -572.46, w: 1919.8, h: 1080.03 }} /></Place>
      <Place x={988} y={156.4}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={698}>{title}</Text>
      </Place>
      <Place x={988} y={373.6}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={698}>{body}</Text>
      </Place>
    </Slide>
  );
}
