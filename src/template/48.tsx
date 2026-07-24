import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 48" };

export interface Slide48Contact {
  /** Small label above the value. */
  label: string;
  /** Contact value under the label. */
  value: string;
}

export interface Slide48Props {
  /** Giant closing title (white). Use `\n` for line breaks. */
  title?: string;
  /** Up to 3 label/value contact columns. Extra items are ignored. */
  contacts?: Slide48Contact[];
}

/** Fixed contact columns — left edge + value max width, preserved from the original. */
const POS = [
  { x: 101, vMax: 345 },
  { x: 1047, vMax: 300 },
  { x: 1560, vMax: 300 },
];

// Parametrized reproduction of the official template's Slide 48 (thanks / closing).
export default function Slide48({
  title = "Thank you!\nLet’s do\nthis!",
  contacts = [
    { label: "Email", value: "contact@vintasoftware.com" },
    { label: "Phone", value: "+1 (555) 123-4567" },
    { label: "Website", value: "www.vintasoftware.com" },
  ],
}: Slide48Props = {}) {
  return (
    <Slide bg="blue-section" pad={false}>
      <Place x={-6.19} y={0} w={1932.38} h={1080}><Photo src="img-f316592b6d.png" /></Place>
      <Place x={101} y={254.8}>
        <Text size={129.1} weight={700} color="#FFFFFF" leading={1.14} maxWidth={860}>{title}</Text>
      </Place>
      {contacts.slice(0, 3).map((c, i) => {
        const s = POS[i];
        return (
          <Fragment key={i}>
            <Place x={s.x} y={908.6}>
              <Text size={16.1} weight={400} color="#FFFFFF" leading={1.32} maxWidth={200}>{c.label}</Text>
            </Place>
            <Place x={s.x} y={949}>
              <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={s.vMax}>{c.value}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
