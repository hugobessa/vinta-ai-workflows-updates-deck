import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 27" };

export interface Slide27Props {
  /** Centered heading over the image band (blue). */
  title?: string;
  /** Centered intro text below the title (black). Two blocks; use `\n` within each. */
  body?: string[];
}

// Parametrized reproduction of the official template's Slide 27 (centered intro over image band).
export default function Slide27({
  title = "Insert very long text here",
  body = [
    "Lorem ipsum dolor sit amet consectetur adipiscing elit etiam nec\nsuscipit dui sed cursus nibh id risus ultrices convallis phasellus",
    "vel tristique diam.",
  ],
}: Slide27Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={387.04} w={639.66} h={614.17}><Photo src="img-1846ceb0e5.png" inner={{ x: 0, y: -356.89, w: 1919.97, h: 1080 }} /></Place>
      <Place x={1729} y={0} w={191} h={191}><Photo src="img-430b7f1b96.png" /></Place>
      <Place x={0} y={99.77} w={108.07} h={107.48}><Photo src="img-d834a8dab0.png" /></Place>
      <Place x={100.18} y={0.06} w={107.82} h={107.74}><Photo src="img-e6fbb8e4b6.png" /></Place>
      <Place x={0.08} y={0} w={108.56} h={108.29}><Photo src="img-9bcf481774.png" /></Place>
      <Place x={639.65} y={387.04} w={640.61} h={614.17}><Photo src="img-1846ceb0e5.png" inner={{ x: -641.11, y: -356.89, w: 1922.83, h: 1080 }} /></Place>
      <Place x={1280.27} y={387.04} w={639.66} h={614.17}><Photo src="img-1846ceb0e5.png" inner={{ x: -1280.32, y: -356.89, w: 1919.97, h: 1080 }} /></Place>
      <Place x={0} y={92.4} w={1920}>
        <Text size={71} weight={700} color="#0052FF" align="center" leading={1.14}>{title}</Text>
      </Place>
      <Place x={0} y={200.1} w={1920}>
        <Text size={24.7} weight={500} color="#000000" align="center" leading={1.32}>{body[0]}</Text>
      </Place>
      <Place x={0} y={273.7} w={1920}>
        <Text size={24.7} weight={500} color="#000000" align="center" leading={1.32}>{body[1]}</Text>
      </Place>
    </Slide>
  );
}
