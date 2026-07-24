import { CodeBlock, Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 36" };

export interface Slide36Props {
  /** Heading over the code window (white). */
  title?: string;
  /** Source shown in the light editor window. */
  code?: string;
  /** Prism language id (js, ts, tsx, bash, json, python…). */
  language?: string;
  /** Code font size in slide px. */
  fontSize?: number;
}

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

// Parametrized reproduction of the official template's Slide 36 (code, light, bg photo).
export default function Slide36({
  title = "Insert\ntitle\nhere",
  code = DEFAULT_CODE,
  language = "js",
  fontSize = 28,
}: Slide36Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-0d84f70f37.png" /></Place>
      <Place x={532.3} y={155.3} w={1230.3} h={769.4}>
        <CodeBlock theme="light" language={language} fontSize={fontSize} code={code} />
      </Place>
      <Place x={101} y={179.4}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={400}>{title}</Text>
      </Place>
    </Slide>
  );
}
