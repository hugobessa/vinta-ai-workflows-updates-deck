import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 43" };

export interface Slide43Person {
  /** Member name. */
  name: string;
  /** Role under the name. */
  role: string;
  /** First bio line. */
  line1: string;
  /** Second bio line. */
  line2: string;
}

export interface Slide43Props {
  /** Centered heading (white). */
  title?: string;
  /** Centered supporting paragraph (white). Use `\n` for line breaks. */
  body?: string;
  /** Up to 4 team members (single row). Extra items are ignored. */
  people?: Slide43Person[];
}

/** Fixed 4-column member slots — left edge, preserved from the original. */
const POS = [
  { x: 71 },
  { x: 526 },
  { x: 981 },
  { x: 1425 },
];

// Parametrized reproduction of the official template's Slide 43 (team grid, dark).
export default function Slide43({
  title = "Insert long text here",
  body = "Lorem ipsum dolor sit amet consectetur adipiscing elit etiam\nnec suscipit dui sed cursus nibh id risus ultrices convallis.",
  people = [
    { name: "Person Name", role: "Role", line1: "Aliquet velit felis molestie", line2: "varius sed" },
    { name: "Person Name", role: "Role", line1: "Aliquet velit felis molestie", line2: "varius sed" },
    { name: "Person Name", role: "Role", line1: "Aliquet velit felis molestie", line2: "varius sed" },
    { name: "Person Name", role: "Role", line1: "Aliquet velit felis molestie", line2: "varius sed" },
  ],
}: Slide43Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-3db6d7dc05.png" /></Place>
      <Place x={172.68} y={725.99} w={221} h={90}><Photo src="img-7dab9b1f34.png" /></Place>
      <Place x={607.89} y={725.99} w={253} h={90}><Photo src="img-c6e1885134.png" /></Place>
      <Place x={1066.11} y={725.99} w={239} h={90}><Photo src="img-25c6d44945.png" /></Place>
      <Place x={1497.82} y={725.99} w={278} h={90}><Photo src="img-1c1408d6dc.png" /></Place>
      <Place x={153} y={442.24} w={260} h={260}><Photo src="img-67fc2595dc.png" /></Place>
      <Place x={608} y={442.24} w={260} h={260}><Photo src="img-4675d42f81.png" /></Place>
      <Place x={1063} y={442.24} w={260} h={260}><Photo src="img-62dc021e00.png" /></Place>
      <Place x={1507} y={442.24} w={260} h={260}><Photo src="img-25e4f1dcf7.png" /></Place>
      <Place x={0} y={158.9} w={1920}>
        <Text size={71} weight={700} color="#FFFFFF" align="center" leading={1.14}>{title}</Text>
      </Place>
      <Place x={0} y={273.6} w={1920}>
        <Text size={24.7} weight={500} color="#FFFFFF" align="center" leading={1.32}>{body}</Text>
      </Place>
      {people.slice(0, 4).map((p, i) => {
        const s = POS[i];
        return (
          <Fragment key={i}>
            <Place x={s.x} y={734.8} w={424}>
              <Text size={30.7} weight={700} color="#FFFFFF" align="center" leading={1.32}>{p.name}</Text>
            </Place>
            <Place x={s.x} y={783} w={424}>
              <Text size={24.2} weight={500} color="#FFFFFF" align="center" leading={1.32}>{p.role}</Text>
            </Place>
            <Place x={s.x} y={847.1} w={424}>
              <Text size={24.7} weight={500} color="#FFFFFF" align="center" leading={1.32}>{p.line1}</Text>
            </Place>
            <Place x={s.x} y={883.9} w={424}>
              <Text size={24.7} weight={500} color="#FFFFFF" align="center" leading={1.32}>{p.line2}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
