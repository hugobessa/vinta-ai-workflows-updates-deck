import { Photo, Place, Shape, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 45" };

export interface Slide45Contact {
  /** Small label above the value. */
  label: string;
  /** Contact value under the label. */
  value: string;
}

export interface Slide45Props {
  /** Giant closing title (white). */
  title?: string;
  /** Up to 2 label/value contact pairs. Extra items are ignored. */
  contacts?: Slide45Contact[];
}

/** Fixed contact slots — left edge + label/value max width, preserved from the original. */
const POS = [
  { x: 101, lMax: 200, vMax: 540 },
  { x: 799, lMax: 201, vMax: 234 },
];

// Parametrized reproduction of the official template's Slide 45 (thanks / closing).
export default function Slide45({
  title = "Thank you",
  contacts = [
    { label: "Email", value: "contact@vintasoftware.com" },
    { label: "Random info", value: "info" },
  ],
}: Slide45Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={745.94}><Photo src="img-525507862e.png" inner={{ x: 0, y: 0, w: 1920, h: 1079.96 }} /></Place>
      <Place x={1601} y={147} w={197} h={195.51}><Shape n={7} fit="cover" /></Place>
      <Place x={1618} y={894.98} w={183} h={41.94}><Photo src="img-e82936c3d8.png" /></Place>
      <Place x={101} y={489.7}>
        <Text size={158.1} weight={700} color="#FFFFFF" leading={1.14} maxWidth={908}>{title}</Text>
      </Place>
      {contacts.slice(0, 2).map((c, i) => {
        const s = POS[i];
        return (
          <Fragment key={i}>
            <Place x={s.x} y={859}>
              <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={s.lMax}>{c.label}</Text>
            </Place>
            <Place x={s.x} y={921.7}>
              <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={s.vMax}>{c.value}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
