import { CodeBlock, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 39" };

export interface Slide39Props {
  /** Heading beside the code window (blue). Use `\n` for line breaks. */
  title?: string;
  /** Supporting line under the title (black). */
  subtitle?: string;
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

// Parametrized reproduction of the official template's Slide 39 (code, dark, subtitle).
export default function Slide39({
  title = "Insert long title here",
  subtitle = "Insert subtitle here",
  code = DEFAULT_CODE,
  language = "js",
  fontSize = 24,
}: Slide39Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1776.38} y={936.95} w={143.46} h={142.87}><Shape n={1} fit="cover" /></Place>
      <Place x={1632.55} y={936.87} w={143.9} h={143.13}><Shape n={9} fit="cover" /></Place>
      <Place x={1776.42} y={794.24} w={143.58} h={142.73}><Shape n={20} fit="cover" /></Place>
      <Place x={148.1} y={57.8} w={1050.1} h={922.3}>
        <CodeBlock theme="dark" language={language} fontSize={fontSize} code={code} />
      </Place>
      <Place x={1293} y={308.9}>
        <Text size={64.5} weight={700} color="#0052FF" leading={1.14} maxWidth={461}>{title}</Text>
      </Place>
      <Place x={1293} y={507.3}>
        <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={466}>{subtitle}</Text>
      </Place>
    </Slide>
  );
}
