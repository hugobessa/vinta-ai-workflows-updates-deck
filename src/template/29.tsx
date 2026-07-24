import { Photo, Place, Slide, Stack, Text } from "@/lib";

export const meta = { title: "Slide 29" };

export interface Slide29Props {
  /** Heading (black). Use `\n` for line breaks. */
  title?: string;
  /** Supporting paragraph (blue). Use `\n` for line breaks. */
  body?: string;
  /** Main hero photo src (the large collage image). */
  photo?: string;
}

// Parametrized reproduction of the official template's Slide 29 (text + hero collage).
export default function Slide29({
  title = "Insert very\nlong text here",
  body = "Lorem ipsum dolor sit amet consectetur\nadipiscing elit etiam nec suscipit dui sed\ncursus nibh id risus ultrices convallis\nphasellus vel tristique diam nam placerat\naliquet libero.",
  photo = "img-9109dff5c4.png",
}: Slide29Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={570} y={0} w={531} h={470}><Photo src="img-f13daf700e.png" /></Place>
      <Place x={0} y={0} w={531} h={470}><Photo src="img-5762c8c3f4.png" /></Place>
      <Place x={1725.46} y={830.05} w={88.25} h={87.91}><Photo src="img-c5fe6be63c.png" /></Place>
      <Place x={1832} y={0} w={88} h={88.03}><Photo src="img-81b291d3cf.png" /></Place>
      <Place x={1636} y={742} w={89.35} h={87.82}><Photo src="img-ffe9cade81.png" /></Place>
      <Place x={1151.21} y={917.96} w={87.79} h={88}><Photo src="img-0bb0126824.png" /></Place>
      <Place x={0} y={514.51} w={1101} h={565.49}><Photo src={photo} inner={{ x: -68.47, y: -115.8, w: 1169.47, h: 849.81 }} /></Place>
      <Place x={1239} y={254.4} w={575}>
        <Stack gap={36}>
          <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{title}</Text>
          <Text size={24.7} weight={500} color="#0052FF" leading={1.32} maxWidth={562}>{body}</Text>
        </Stack>
      </Place>
    </Slide>
  );
}
