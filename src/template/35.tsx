import { CodeBlock, Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 35" };

export interface Slide35Props {
  /** Heading above the code window (blue). */
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

// Parametrized reproduction of the official template's Slide 35 (code, dark).
export default function Slide35({
  title = "Insert long title here",
  code = DEFAULT_CODE,
  language = "js",
  fontSize = 34,
}: Slide35Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1740.73} y={0} w={89.8} h={89.25}><Photo src="img-56b9db3f35.png" /></Place>
      <Place x={1830.14} y={89.63} w={89.86} h={89.37}><Photo src="img-552cfd558f.png" /></Place>
      <Place x={0} y={0} w={77} h={76.71}><Photo src="img-3526429b19.png" /></Place>
      <Place x={1020} y={119} w={516} h={161}><Photo src="img-08421747c6.png" /></Place>
      <Place x={203.4} y={154.6} w={1513.2} h={840.9}>
        <CodeBlock theme="dark" language={language} fontSize={fontSize} code={code} />
      </Place>
      <Place x={121.8} y={79.5}>
        <Text size={53.8} weight={700} color="#0052FF" leading={1.14} maxWidth={770}>{title}</Text>
      </Place>
    </Slide>
  );
}
