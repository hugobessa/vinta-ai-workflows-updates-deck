import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 33" };

export interface Slide33Card {
  /** Card heading (white). */
  title: string;
  /** Body under the heading. Use `\n` for line breaks. */
  text: string;
}

export interface Slide33Props {
  /** Centered heading across the top (white). */
  title?: string;
  /** Up to 4 quadrant feature cards (2×2). Extra items are ignored. */
  cards?: Slide33Card[];
}

/** Fixed 2×2 quadrant slots — title + body position per slot, preserved from the original. */
const CARD_POS = [
  { x: 398, ty: 314.5, by: 373.9 },
  { x: 1293, ty: 314.5, by: 373.9 },
  { x: 398, ty: 632.9, by: 692.3 },
  { x: 1293, ty: 632.9, by: 692.3 },
];

// Parametrized reproduction of the official template's Slide 33 (feature-card grid).
export default function Slide33({
  title = "Insert long text here",
  cards = [
    { title: "Insert long text here", text: "Ut suscipit mi cursus hendrerit ac\nnunc leo pellentesque mauris mattis\neget metus massa blandit eu nulla\nlobortis hendrerit sit ut." },
    { title: "Insert long text here", text: "Ut suscipit mi cursus hendrerit ac\nnunc leo pellentesque mauris mattis\neget metus massa blandit eu nulla\nlobortis hendrerit sit ut." },
    { title: "Insert long text here", text: "Ut suscipit mi cursus hendrerit ac\nnunc leo pellentesque mauris mattis\neget metus massa blandit eu nulla\nlobortis hendrerit sit ut." },
    { title: "Insert long text here", text: "Ut suscipit mi cursus hendrerit ac\nnunc leo pellentesque mauris mattis\neget metus massa blandit eu nulla\nlobortis hendrerit sit ut." },
  ],
}: Slide33Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1930.56} h={1079.99}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: 0, w: 2120.33, h: 1192.63 }} /></Place>
      <Place x={90.39} y={294.18} w={244.33} h={243.35}><Photo src="img-a25bfbf91d.png" inner={{ x: -664.72, y: -390.27, w: 1267.8, h: 713.24 }} /></Place>
      <Place x={90.39} y={615.18} w={244.33} h={243.35}><Photo src="img-a25bfbf91d.png" inner={{ x: -664.72, y: -390.27, w: 1267.8, h: 713.24 }} /></Place>
      <Place x={983.6} y={294.18} w={244.33} h={243.35}><Photo src="img-a25bfbf91d.png" inner={{ x: -664.72, y: -390.27, w: 1267.8, h: 713.24 }} /></Place>
      <Place x={983.6} y={615.18} w={244.33} h={243.35}><Photo src="img-a25bfbf91d.png" inner={{ x: -664.72, y: -390.27, w: 1267.8, h: 713.24 }} /></Place>
      <Place x={0} y={126.4} w={1920}>
        <Text size={71} weight={700} color="#FFFFFF" align="center" leading={1.14}>{title}</Text>
      </Place>
      {cards.slice(0, 4).map((c, i) => {
        const p = CARD_POS[i];
        return (
          <Fragment key={i}>
            <Place x={p.x} y={p.ty}>
              <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={474}>{c.title}</Text>
            </Place>
            <Place x={p.x} y={p.by}>
              <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={497}>{c.text}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
