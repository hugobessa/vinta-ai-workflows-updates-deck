import { Photo, Place, Slide, Text } from "@/lib";

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

/** Quadrant cards grouped into two flowing columns (top y + the card indices in each), so a
 *  taller card pushes the one below it in its column down instead of overlapping it. */
const COLUMNS = [
  { x: 398, y: 314.5, rows: [0, 2] },
  { x: 1293, y: 314.5, rows: [1, 3] },
];
/** Vertical pitch between the two card rows, and the slot the title reserves before its body. */
const ROW_PITCH = 318.4;
const TITLE_SLOT = 59.4;

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
      {COLUMNS.map((col) => (
        <Place key={col.x} x={col.x} y={col.y} w={497}>
          {col.rows.map((idx, r) => {
            const c = cards[idx];
            if (c == null) return null;
            return (
              <div key={idx} style={{ minHeight: r < col.rows.length - 1 ? ROW_PITCH : undefined }}>
                <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={474} style={{ minHeight: TITLE_SLOT }}>{c.title}</Text>
                <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={497}>{c.text}</Text>
              </div>
            );
          })}
        </Place>
      ))}
    </Slide>
  );
}
