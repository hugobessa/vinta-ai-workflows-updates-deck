import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 09" };

export interface Slide09Props {
  /** Heading (blue). */
  title?: string;
  /** Two supporting paragraphs (black). Use `\n` for line breaks. */
  body?: string;
  /** Hero/content photo src (large right panel). */
  photo?: string;
}

// Parametrized reproduction of the official template's Slide 09 (heading + two paragraphs + side photo).
export default function Slide09({
  title = "Insert title here",
  body = "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit etiam nec suscipit dui sed\ncursus nibh id risus ultrices convallis\nphasellus vel tristique diam ham placerat\naliquet libero a aliquam nisl accumsan eget\netiam ultrices.\n\n\nAt sed pretium ac condimentum in non arcu\nvenenatis ac nulla nullam cursus morbi eget\nmagna donec lacus fames",
  photo = "img-c8d8bedfe6.png",
}: Slide09Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={903.27} y={0} w={1016.73} h={1080}><Photo src={photo} inner={{ x: -1123.75, y: 0, w: 2140.47, h: 1203.97 }} /></Place>
      <Place x={0} y={0} w={129.38} h={130.08}><Photo src="img-f037e44ce5.png" /></Place>
      <Place x={129.29} y={0.11} w={132.72} h={130.45}><Photo src="img-7071b8ff36.png" /></Place>
      <Place x={261.96} y={0.11} w={131.04} h={130.45}><Photo src="img-cb3f6933e5.png" /></Place>
      <Place x={101} y={271.5}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={645}>{title}</Text>
      </Place>
      <Place x={101} y={414.8}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={645}>{body}</Text>
      </Place>

    </Slide>
  );
}
