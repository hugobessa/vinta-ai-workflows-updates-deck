import { CodeBlock, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 38" };

export interface Slide38Props {
  /** Heading over the code window (white). */
  title?: string;
  /** Source shown in the dark editor window. */
  code?: string;
  /** Prism language id (js, ts, tsx, bash, json, python…). */
  language?: string;
  /** Code font size in slide px. */
  fontSize?: number;
  /** Up to 4 topic items down the right side. Use `\n` for line breaks. Extra items are ignored. */
  topics?: string[];
}

/** Fixed right-side topic slots — y position, preserved from the original. */
const TOPIC_POS = [
  { y: 318.3 },
  { y: 469.5 },
  { y: 620.7 },
  { y: 771.9 },
];

const DEFAULT_CODE = `const pluckDeep = key => obj =>
  key.split('.')
    .reduce((accum, k) => accum[k], obj)

const compose = (...fns) => res =>
  fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`;

// Parametrized reproduction of the official template's Slide 38 (code, dark, side topics).
export default function Slide38({
  title = "Title here and code below",
  code = DEFAULT_CODE,
  language = "js",
  fontSize = 27,
  topics = [
    "Insert topics or\nphrase",
    "Insert topics or\nphrase",
    "Insert topics or\nphrase",
    "Insert topics or\nphrase",
  ],
}: Slide38Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1847.2} y={145.26} w={72.8} h={72.6}><Shape n={10} fit="cover" flipX flipY /></Place>
      <Place x={1767.25} y={0} w={152.67} h={151.77}><Shape n={20} fit="cover" flipX flipY /></Place>
      <Place x={101} y={190} w={1181.3} h={807.5}>
        <CodeBlock theme="dark" language={language} fontSize={fontSize} code={code} />
      </Place>
      <Place x={101} y={55.3}>
        <Text size={51.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={832}>{title}</Text>
      </Place>
      {topics.slice(0, 4).map((t, i) => (
        <Place key={i} x={1440} y={TOPIC_POS[i].y}>
          <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={312}>{t}</Text>
        </Place>
      ))}
    </Slide>
  );
}
