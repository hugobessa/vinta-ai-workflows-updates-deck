import { CodeBlock, Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 37" };

export interface Slide37Props {
  /** Heading over the code window (blue). */
  title?: string;
  /** Source shown in the dark editor window. */
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

// Parametrized reproduction of the official template's Slide 37 (code, dark, wide).
export default function Slide37({
  title = "Insert long text here",
  code = DEFAULT_CODE,
  language = "js",
  fontSize = 32,
}: Slide37Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1552.51} y={0} w={123.16} h={122.51}><Photo src="img-1125f071b4.png" /></Place>
      <Place x={1798.07} y={0.45} w={121.94} h={121.84}><Photo src="img-4168bee9b0.png" /></Place>
      <Place x={1674.37} y={0.33} w={124.21} h={122.18}><Photo src="img-85c514146d.png" /></Place>
      <Place x={1309.44} y={0} w={121.92} h={122.46}><Photo src="img-381421d8e4.png" /></Place>
      <Place x={1431.3} y={0} w={121.86} h={122.51}><Photo src="img-7fd6dea289.png" /></Place>
      <Place x={156} y={148.3} w={1608.1} h={852.9}>
        <CodeBlock theme="dark" language={language} fontSize={fontSize} code={code} />
      </Place>
      <Place x={103.7} y={49.6}>
        <Text size={37.6} weight={700} color="#0052FF" leading={1.14} maxWidth={542}>{title}</Text>
      </Place>
    </Slide>
  );
}
