import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 19" };

export interface Slide19Item {
  /** Small blue index label, e.g. "01". */
  number: string;
  /** Item heading (black). */
  title: string;
  /** Item paragraph (black). Use `\n` for line breaks. */
  text: string;
}

export interface Slide19Props {
  /** Big heading on the left (blue). */
  title?: string;
  /** Bold lead line under the heading (black). */
  subtitle?: string;
  /** Body paragraph under the lead line (black). Use `\n` for line breaks. */
  body?: string;
  /** Up to 3 numbered items on the right. Extra items are ignored. */
  items?: Slide19Item[];
}

/** Side items flow in a single column, so a taller item pushes the one below it down instead
 *  of overlapping it. The number sits in a fixed left gutter beside the heading. */
const COLUMN = { x: 1108.2, y: 218.7 };
/** Vertical pitch between items; number gutter width (heading x − number x); heading→text slot. */
const ROW_PITCH = 238.9;
const NUM_GUTTER = 116;
const HEAD_SLOT = 56.9;

const DEFAULT_ITEM_TEXT = "In nulla ultrices ipsum mus elit\nscelerisque fermentum tortor cursus\nmorbi tellus ornare.";

// Parametrized reproduction of the official template's Slide 19 (heading + side numbered items).
export default function Slide19({
  title = "Insert text here",
  subtitle = "Lorem ipsum dolor sit amet, consectetur",
  body = "adipiscing elit etiam nec suscipit dui sed cursus\nnibh id risus ultrices convallis phasellus vel\ntristique diam ham placerat aliquet libero a\naliquam nisl accumsan eget etiam ultrices.",
  items = [
    { number: "01", title: "Insert text here", text: DEFAULT_ITEM_TEXT },
    { number: "02", title: "Insert text here", text: DEFAULT_ITEM_TEXT },
    { number: "03", title: "Insert text here", text: DEFAULT_ITEM_TEXT },
  ],
}: Slide19Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-e8561d1d3f.png" /></Place>
      <Place x={1827.68} y={276.98} w={92.33} h={92.33}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={1827.68} y={0} w={92.33} h={92.33}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={1827.18} y={276.48} w={92.54} h={92.82}><Photo src="img-67132a7b9e.png" /></Place>
      <Place x={1827.18} y={184.34} w={92.82} h={92.14}><Photo src="img-cc2c94f684.png" /></Place>
      <Place x={1827.22} y={0} w={92.78} h={92.04}><Photo src="img-893765490b.png" /></Place>
      <Place x={1827.18} y={91.83} w={92.37} h={92.78}><Photo src="img-381421d8e4.png" /></Place>
      <Place x={183.56} y={987.67} w={0} h={0}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={460.54} y={987.67} w={0} h={0}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={184.06} y={987.18} w={0} h={0}><Photo src="img-67132a7b9e.png" /></Place>
      <Place x={276.2} y={987.18} w={0} h={0}><Photo src="img-cc2c94f684.png" /></Place>
      <Place x={368.71} y={987.18} w={0} h={0}><Photo src="img-381421d8e4.png" /></Place>
      <Place x={92.04} y={987.22} w={0} h={0}><Photo src="img-893765490b.png" /></Place>
      {/* Title + lead + body flow in one Place; each minHeight reserves its slot, so a taller title/lead pushes what's below it down instead of covering it. */}
      <Place x={130} y={352.1} w={706}>
        <Text size={64.5} weight={700} color="#0052FF" leading={1.14} maxWidth={683} style={{ minHeight: 108.1 }}>{title}</Text>
        <Text size={27} weight={700} color="#000000" leading={1.32} maxWidth={600} style={{ minHeight: 40 }}>{subtitle}</Text>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={706}>{body}</Text>
      </Place>
      <Place x={COLUMN.x} y={COLUMN.y} w={655}>
        {items.slice(0, 3).map((item, r, arr) => (
          <div key={r} style={{ position: "relative", minHeight: r < arr.length - 1 ? ROW_PITCH : undefined }}>
            <Text size={33.9} weight={700} color="#0052FF" leading={1.32} maxWidth={200} style={{ position: "absolute", left: 0, top: 0 }}>{item.number}</Text>
            <div style={{ marginLeft: NUM_GUTTER }}>
              <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362} style={{ minHeight: HEAD_SLOT }}>{item.title}</Text>
              <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={539}>{item.text}</Text>
            </div>
          </div>
        ))}
      </Place>
    </Slide>
  );
}
