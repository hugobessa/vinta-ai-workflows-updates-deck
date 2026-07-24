import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 14" };

export interface Slide14Item {
  /** Small blue index label, e.g. "01". */
  number: string;
  /** Row heading (black). */
  title: string;
}

export interface Slide14Props {
  /** Up to 6 numbered rows (2 columns × 3 rows). Extra items are ignored. */
  items?: Slide14Item[];
}

/** Fixed slots — number position + heading position per row (01–06), preserved from the original. */
const ITEM_POS = [
  { numX: 195, numY: 268, headX: 271.3, headY: 254.8 },
  { numX: 195, numY: 478, headX: 271.3, headY: 464.8 },
  { numX: 195, numY: 688, headX: 271.3, headY: 674.8 },
  { numX: 1081, numY: 268, headX: 1183.9, headY: 254.8 },
  { numX: 1081, numY: 478, headX: 1183.9, headY: 464.8 },
  { numX: 1081, numY: 688, headX: 1183.9, headY: 674.8 },
];

// Parametrized reproduction of the official template's Slide 14 (numbered rows).
export default function Slide14({
  items = [
    { number: "01", title: "Insert text here" },
    { number: "02", title: "Insert text here" },
    { number: "03", title: "Insert text here" },
    { number: "04", title: "Insert text here" },
    { number: "05", title: "Insert text here" },
    { number: "06", title: "Insert text here" },
  ],
}: Slide14Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1535.22} y={0} w={384.77} h={382.76}><Photo src="img-e60976291e.png" inner={{ x: -1535.15, y: 0, w: 1919.93, h: 1079.99 }} /></Place>
      <Place x={0} y={697.24} w={587.64} h={382.76}><Photo src="img-e60976291e.png" inner={{ x: -11.56, y: -591.23, w: 1919.88, h: 1079.96 }} /></Place>
      <Place x={1086} y={659.99} w={684.75} h={74}><Photo src="img-ee4010a0a2.png" /></Place>
      <Place x={1086} y={450} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={1086} y={240} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={200} y={659.99} w={684.75} h={74}><Photo src="img-ee4010a0a2.png" /></Place>
      <Place x={200} y={450} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={200} y={240} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      {items.slice(0, 6).map((item, i) => {
        const p = ITEM_POS[i];
        return (
          <Fragment key={i}>
            <Place x={p.headX} y={p.headY}>
              <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={548}>{item.title}</Text>
            </Place>
            <Place x={p.numX} y={p.numY}>
              <Text size={24.2} weight={500} color="#0052FF" leading={1.32} maxWidth={200}>{item.number}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
