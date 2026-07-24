import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 15" };

export interface Slide15Card {
  /** Card heading (the "N. " index is prepended automatically). */
  title: string;
  /** Subtitle under the heading. Use `\n` for line breaks. */
  text: string;
}

export interface Slide15Props {
  /** Up to 6 numbered cards (3×2). Extra items are ignored. */
  cards?: Slide15Card[];
}

/** Fixed 3×2 card slots — title + subtitle position per slot, preserved from the original. */
const CARD_POS = [
  { x: 180, ty: 356.2, sy: 416.2 },
  { x: 734.5, ty: 356.4, sy: 416.4 },
  { x: 1289, ty: 356.1, sy: 416.1 },
  { x: 180, ty: 691.5, sy: 751.5 },
  { x: 734.5, ty: 691, sy: 751 },
  { x: 1289, ty: 691.2, sy: 751.2 },
];

// Parametrized reproduction of the official template's Slide 15 (feature-card grid).
export default function Slide15({
  cards = [
    { title: "Insert text here", text: "Lorem ipsum dolor sit amet\nconsectetur adipiscing elit" },
    { title: "Insert text here", text: "Lorem ipsum dolor sit amet\nconsectetur adipiscing elit" },
    { title: "Insert text here", text: "Lorem ipsum dolor sit amet\nconsectetur adipiscing elit" },
    { title: "Insert text here", text: "Lorem ipsum dolor sit amet\nconsectetur adipiscing elit" },
    { title: "Insert text here", text: "Lorem ipsum dolor sit amet\nconsectetur adipiscing elit" },
    { title: "Insert text here", text: "Lorem ipsum dolor sit amet\nconsectetur adipiscing elit" },
  ],
}: Slide15Props = {}) {
  return (
    <Slide bg="blue-section" pad={false}>
      <Place x={0} y={0} w={1930.56} h={1079.99}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: 0, w: 2120.33, h: 1192.63 }} /></Place>
      <Place x={185} y={252.19} w={446} h={240.28}><Photo src="img-7b6555cbba.png" /></Place>
      <Place x={185} y={587.19} w={446} h={240.62}><Photo src="img-2d740c45b6.png" /></Place>
      <Place x={737} y={252.19} w={446} h={240.46}><Photo src="img-c5ead63246.png" /></Place>
      <Place x={737} y={587.19} w={446} h={240.07}><Photo src="img-7d567e09a3.png" /></Place>
      <Place x={1289} y={252.19} w={446} h={240.19}><Photo src="img-6963d3e042.png" /></Place>
      <Place x={1289} y={587.19} w={446} h={240.33}><Photo src="img-1b6dcd00dc.png" /></Place>
      {cards.slice(0, 6).map((c, i) => {
        const p = CARD_POS[i];
        return (
          <Fragment key={i}>
            <Place x={p.x} y={p.ty}>
              <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409}>{`${i + 1}. ${c.title}`}</Text>
            </Place>
            <Place x={p.x} y={p.sy}>
              <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{c.text}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
