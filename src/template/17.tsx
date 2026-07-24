import { Photo, Place, Shape, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 17" };

export interface Slide17Card {
  /** Card heading (the "0N" index label is rendered automatically). */
  title: string;
  /** Body under the heading. Use `\n` for line breaks. */
  text: string;
}

export interface Slide17Props {
  /** Left column heading (white). Use `\n` for line breaks. */
  title?: string;
  /** Left column paragraph (white). Use `\n` for line breaks. */
  body?: string;
  /** Up to 4 numbered cards (2×2, "01"–"04"). Extra items are ignored. */
  cards?: Slide17Card[];
}

/** Fixed 2×2 card slots — number + title + body position per slot, preserved from the original. */
const CARD_POS = [
  { x: 905.1, ny: 206.4, ty: 322.7, by: 388.1 },
  { x: 1424.1, ny: 206.4, ty: 322.7, by: 388.1 },
  { x: 905.1, ny: 621.4, ty: 737.7, by: 803.1 },
  { x: 1424.1, ny: 621.4, ty: 737.7, by: 803.1 },
];

// Parametrized reproduction of the official template's Slide 17 (feature-card grid).
export default function Slide17({
  title = "Insert text\nhere",
  body = "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit etiam\nnec suscipit dui sed cursus nibh\nid risus ultrices convallis .",
  cards = [
    { title: "Insert text here", text: "Porta sit viverra ultricies at\nblandit dui nibh at sed et\npellentesque eget dolor sit\namet consectur dolor sit met." },
    { title: "Insert text here", text: "Porta sit viverra ultricies at\nblandit dui nibh at sed et\npellentesque eget dolor sit\namet consectur dolor sit met." },
    { title: "Insert text here", text: "Porta sit viverra ultricies at\nblandit dui nibh at sed et\npellentesque eget dolor sit\namet consectur dolor sit met." },
    { title: "Insert text here", text: "Porta sit viverra ultricies at\nblandit dui nibh at sed et\npellentesque eget dolor sit\namet consectur dolor sit met." },
  ],
}: Slide17Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080.01}><Photo src="img-45526c2d9e.png" inner={{ x: 0, y: 0, w: 2119.28, h: 1192.22 }} /></Place>
      <Place x={865.25} y={186} w={429.54} h={321}><Photo src="img-c96c2e2daf.png" /></Place>
      <Place x={865.25} y={601} w={429.54} h={321}><Photo src="img-c96c2e2daf.png" /></Place>
      <Place x={1384} y={601} w={429.54} h={321}><Photo src="img-c96c2e2daf.png" /></Place>
      <Place x={138} y={194} w={479} h={338}><Photo src="img-48e9e274bb.png" /></Place>
      <Place x={138} y={724} w={168} h={167.75}><Shape n={6} fit="cover" /></Place>
      <Place x={133} y={185.4}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={487}>{title}</Text>
      </Place>
      <Place x={133} y={413.7}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={480}>{body}</Text>
      </Place>
      {cards.slice(0, 4).map((c, i) => {
        const p = CARD_POS[i];
        return (
          <Fragment key={i}>
            <Place x={p.x} y={p.ny}>
              <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{String(i + 1).padStart(2, "0")}</Text>
            </Place>
            <Place x={p.x} y={p.ty}>
              <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={362}>{c.title}</Text>
            </Place>
            <Place x={p.x} y={p.by}>
              <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={401}>{c.text}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
