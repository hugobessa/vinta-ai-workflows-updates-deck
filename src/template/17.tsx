import { Photo, Place, Shape, Slide, Text } from "@/lib";

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

/** Cards grouped into two flowing columns (top y + the card indices in each), so a taller
 *  card pushes the one below it in its column down instead of overlapping it. */
const COLUMNS = [
  { x: 905.1, y: 206.4, rows: [0, 2] },
  { x: 1424.1, y: 206.4, rows: [1, 3] },
];
/** Vertical pitch between the two card rows. */
const ROW_PITCH = 415;
/** Slots the number and title reserve before what follows them (from the original spacing). */
const NUM_SLOT = 116.3;
const TITLE_SLOT = 65.4;

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
      {/* Left title + body flow in one Place; the title's minHeight reserves its slot, so a taller title pushes the body down instead of covering it. */}
      <Place x={133} y={185.4} w={487}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={487} style={{ minHeight: 228.3 }}>{title}</Text>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={480}>{body}</Text>
      </Place>
      {COLUMNS.map((col) => (
        <Place key={col.x} x={col.x} y={col.y} w={401}>
          {col.rows.map((idx, r) => {
            const c = cards[idx];
            if (c == null) return null;
            return (
              <div key={idx} style={{ minHeight: r < col.rows.length - 1 ? ROW_PITCH : undefined }}>
                <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200} style={{ minHeight: NUM_SLOT }}>{String(idx + 1).padStart(2, "0")}</Text>
                <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={362} style={{ minHeight: TITLE_SLOT }}>{c.title}</Text>
                <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={401}>{c.text}</Text>
              </div>
            );
          })}
        </Place>
      ))}
    </Slide>
  );
}
