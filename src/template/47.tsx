import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

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

/** Fixed right-column contact slots — label/value y + value max width, preserved from the original. */
const POS = [
  { ly: 108.8, vy: 192.8, vMax: 745 },
  { ly: 472.8, vy: 556.8, vMax: 745 },
  { ly: 836.8, vy: 920.8, vMax: 745 },
];

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
      <Place x={101} y={676.3}>
        <Text size={40.3} weight={700} color="#FFFFFF" leading={1.14} maxWidth={258}>{title}</Text>
      </Place>
      <Place x={101} y={760.9}>
        <Text size={93.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={639}>{subtitle}</Text>
      </Place>
      {contacts.slice(0, 3).map((c, i) => {
        const s = POS[i];
        return (
          <Fragment key={i}>
            <Place x={922} y={s.ly}>
              <Text size={30.7} weight={700} color="#000000" leading={1.32} maxWidth={200}>{c.label}</Text>
            </Place>
            <Place x={922} y={s.vy}>
              <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={s.vMax}>{c.value}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
