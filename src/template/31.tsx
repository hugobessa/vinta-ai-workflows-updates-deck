import { Photo, Place, Slide } from "@/lib";

export const meta = { title: "Slide 31" };

export interface Slide31Props {
  /** Up to 8 grid photos mapped over the fixed 2×4 tile layout. Extra items are ignored. */
  photos?: string[];
}

/** Fixed 8-tile grid slots — position, preserved from the original (all 408×369). */
const TILE_POS = [
  { x: 87, y: 106 },
  { x: 87, y: 504 },
  { x: 533, y: 106 },
  { x: 533, y: 504 },
  { x: 979, y: 106 },
  { x: 979, y: 504 },
  { x: 1425, y: 106 },
  { x: 1425, y: 504 },
];

// Parametrized reproduction of the official template's Slide 31 (8-tile photo grid).
export default function Slide31({
  photos = Array<string>(8).fill("img-952e7b4283.png"),
}: Slide31Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-65d1c7ad5a.png" /></Place>
      {photos.slice(0, 8).map((src, i) => (
        <Place key={i} x={TILE_POS[i].x} y={TILE_POS[i].y} w={408} h={369}><Photo src={src} /></Place>
      ))}
      <Place x={0} y={953.51} w={1285.35} h={126.49}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -592.51, w: 1411.7, h: 793.98 }} /></Place>
      <Place x={1277.32} y={953.51} w={642.68} h={126.49}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -592.51, w: 1411.7, h: 793.98 }} /></Place>
    </Slide>
  );
}
