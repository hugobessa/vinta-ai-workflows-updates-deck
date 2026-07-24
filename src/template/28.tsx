import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 28" };

export interface Slide28Props {
  /** Centered heading (black). */
  title?: string;
  /** Up to 2 content images to compare (left, right). Extra items are ignored. */
  photos?: string[];
}

/** Fixed image slots — position/size, preserved from the original. */
const IMG_POS = [
  { x: 106, y: 262, w: 834, h: 606 },
  { x: 980, y: 262, w: 834, h: 606 },
];

// Parametrized reproduction of the official template's Slide 28 (two-image comparison).
export default function Slide28({
  title = "Insert text here",
  photos = ["img-2451c7eeac.png", "img-9109dff5c4.png"],
}: Slide28Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1600} y={974.25} w={106.17} h={105.75}><Shape n={12} fit="cover" flipX flipY /></Place>
      <Place x={1812.38} y={974.22} w={107.62} h={105.78}><Shape n={15} fit="cover" flipX flipY /></Place>
      <Place x={1706.17} y={974.22} w={106.26} h={105.78}><Shape n={18} fit="cover" flipX flipY /></Place>
      {photos.slice(0, 2).map((src, i) => (
        <Place key={i} x={IMG_POS[i].x} y={IMG_POS[i].y} w={IMG_POS[i].w} h={IMG_POS[i].h}><Photo src={src} /></Place>
      ))}
      <Place x={0} y={132.4} w={1920}>
        <Text size={71} weight={700} color="#000000" align="center" leading={1.14}>{title}</Text>
      </Place>
    </Slide>
  );
}
