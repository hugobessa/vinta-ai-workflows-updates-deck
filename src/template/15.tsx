import { Photo, Place, Slide, Text } from "@/lib";

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

/** Cards grouped into three flowing columns (top y + row pitch + the card indices in each),
 *  so a taller card pushes the one below it in its column down instead of overlapping it. */
const COLUMNS = [
  { x: 180, y: 356.2, pitch: 335.3, rows: [0, 3] },
  { x: 734.5, y: 356.4, pitch: 334.6, rows: [1, 4] },
  { x: 1289, y: 356.1, pitch: 335.1, rows: [2, 5] },
];
/** Gap the card title reserves before its subtitle (original 60px). */
const TITLE_SLOT = 60;

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
      {COLUMNS.map((col) => (
        <Place key={col.x} x={col.x} y={col.y} w={410}>
          {col.rows.map((idx, r) => {
            const c = cards[idx];
            if (c == null) return null;
            return (
              <div key={idx} style={{ minHeight: r < col.rows.length - 1 ? col.pitch : undefined }}>
                <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409} style={{ minHeight: TITLE_SLOT }}>{`${idx + 1}. ${c.title}`}</Text>
                <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{c.text}</Text>
              </div>
            );
          })}
        </Place>
      ))}
    </Slide>
  );
}
