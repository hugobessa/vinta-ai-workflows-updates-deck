import { Photo, Place, Shape, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 18" };

export interface Slide18Item {
  /** Small blue index label, e.g. "01". */
  number: string;
  /** Feature heading (black). */
  title: string;
  /** Feature paragraph (black). Use `\n` for line breaks. */
  text: string;
}

export interface Slide18Props {
  /** Up to 5 numbered feature blocks. Extra items are ignored. */
  items?: Slide18Item[];
}

/** Fixed slots — number/heading/paragraph positions per feature (01–05), preserved from the original. */
const ITEM_POS = [
  { x: 104.2, numY: 195.2, headY: 288.9, paraY: 358.9 },
  { x: 731.2, numY: 195.2, headY: 288.9, paraY: 358.9 },
  { x: 1358.2, numY: 195.2, headY: 288.9, paraY: 358.9 },
  { x: 731.2, numY: 599.4, headY: 693.1, paraY: 763.1 },
  { x: 1358.2, numY: 599.4, headY: 693.1, paraY: 763.1 },
];

const DEFAULT_TEXT = "Lectus lacus hendrerit morbi\nlectus eget orci nisi platea. Quis\nmi nisi ut integer. Lorem lacus\nbibendum turpis arcu.";

// Parametrized reproduction of the official template's Slide 18 (numbered feature blocks).
export default function Slide18({
  items = [
    { number: "01", title: "Insert text here", text: DEFAULT_TEXT },
    { number: "02", title: "Insert text here", text: DEFAULT_TEXT },
    { number: "03", title: "Insert text here", text: DEFAULT_TEXT },
    { number: "04", title: "Insert text here", text: DEFAULT_TEXT },
    { number: "05", title: "Insert text here", text: DEFAULT_TEXT },
  ],
}: Slide18Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={107.79} y={602.23} w={127.42} h={128}><Photo src="img-ddb35cc958.png" /></Place>
      <Place x={109.21} y={729.52} w={128} h={127.42}><Shape n={13} fit="cover" /></Place>
      <Place x={235.21} y={602.52} w={128} h={127.42}><Photo src="img-eb6d6d26ba.png" /></Place>
      <Place x={237.21} y={729.23} w={127.42} h={128}><Photo src="img-9e9dfe2014.png" /></Place>
      <Place x={363.21} y={602.52} w={128} h={127.42}><Shape n={13} fit="cover" /></Place>
      <Place x={364.21} y={729.52} w={127} h={128}><Photo src="img-df75f8539b.png" /></Place>
      <Place x={280.81} y={-1.93} w={93.44} h={93.44}><Photo src="img-d11aab5d90.png" flipY /></Place>
      <Place x={187.37} y={-1.93} w={93.44} h={93.44}><Photo src="img-d11aab5d90.png" flipY /></Place>
      <Place x={0.5} y={-2.43} w={93.44} h={93.44}><Photo src="img-d11aab5d90.png" flipY /></Place>
      <Place x={1826.35} y={-1.81} w={93.65} h={93.26}><Photo src="img-01a5d20a1e.png" flipY /></Place>
      <Place x={0} y={-2.43} w={93.65} h={93.94}><Shape n={4} fit="cover" flipY /></Place>
      <Place x={93.44} y={-2.43} w={93.94} h={94.08}><Photo src="img-539d343430.png" flipY /></Place>
      <Place x={1732.46} y={-1.93} w={93.94} h={93.44}><Photo src="img-5965735368.png" flipY /></Place>
      <Place x={187.36} y={-2.42} w={93.52} h={93.88}><Shape n={11} fit="cover" flipY /></Place>
      <Place x={1826.38} y={91.65} w={93.59} h={93.64}><Photo src="img-187d5e1025.png" flipY /></Place>
      {items.slice(0, 5).map((item, i) => {
        const p = ITEM_POS[i];
        return (
          <Fragment key={i}>
            <Place x={p.x} y={p.numY}>
              <Text size={51.6} weight={700} color="#0052FF" leading={1.14} maxWidth={200}>{item.number}</Text>
            </Place>
            <Place x={p.x} y={p.headY}>
              <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{item.title}</Text>
            </Place>
            <Place x={p.x} y={p.paraY}>
              <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={441}>{item.text}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
