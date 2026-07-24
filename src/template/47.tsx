import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 47" };

export interface Slide47Contact {
  /** Small label above the value. */
  label: string;
  /** Contact value under the label. */
  value: string;
}

export interface Slide47Props {
  /** Small eyebrow above the main title (white). */
  title?: string;
  /** Large main title (white). Use `\n` for line breaks. */
  subtitle?: string;
  /** Up to 3 label/value contact pairs on the right. Extra items are ignored. */
  contacts?: Slide47Contact[];
}

/** Contacts flow in a single right-hand column, so a taller value pushes the contact below it
 *  down instead of overlapping it. */
const COLUMN = { x: 922, y: 108.8 };
/** Vertical pitch between contacts, and the slot the label reserves before its value. */
const ROW_PITCH = 364;
const LABEL_SLOT = 84;
const VALUE_MAX = 745;

// Parametrized reproduction of the official template's Slide 47 (thanks / closing, split).
export default function Slide47({
  title = "Thank you",
  subtitle = "Insert text\nhere",
  contacts = [
    { label: "Email", value: "contact@vintasoftware.com" },
    { label: "Other info", value: "Insert text here" },
    { label: "Other info", value: "Insert text here" },
  ],
}: Slide47Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={819.88} h={1080}><Photo src="img-82f980769f.png" inner={{ x: 0, y: 0, w: 1919.95, h: 1080 }} /></Place>
      <Place x={82} y={139} w={183} h={41.94}><Photo src="img-dd5f278a20.png" /></Place>
      {/* Eyebrow + big title flow in one Place; the eyebrow's minHeight reserves its slot, so a taller eyebrow pushes the title down instead of covering it. */}
      <Place x={101} y={676.3} w={639}>
        <Text size={40.3} weight={700} color="#FFFFFF" leading={1.14} maxWidth={258} style={{ minHeight: 84.6 }}>{title}</Text>
        <Text size={93.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={639}>{subtitle}</Text>
      </Place>
      <Place x={COLUMN.x} y={COLUMN.y} w={VALUE_MAX}>
        {contacts.slice(0, 3).map((c, r, arr) => (
          <div key={r} style={{ minHeight: r < arr.length - 1 ? ROW_PITCH : undefined }}>
            <Text size={30.7} weight={700} color="#000000" leading={1.32} maxWidth={200} style={{ minHeight: LABEL_SLOT }}>{c.label}</Text>
            <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={VALUE_MAX}>{c.value}</Text>
          </div>
        ))}
      </Place>
    </Slide>
  );
}
