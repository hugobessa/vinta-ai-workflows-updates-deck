import { CodeBlock, Photo, Place, Slide, Stack, Text } from "@/lib";

export const meta = { title: "Slide 41" };

export interface Slide41Props {
  /** Heading on the left (black). */
  title?: string;
  /** Two supporting paragraphs (black). Use `\n` for line breaks. */
  body?: string[];
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

// Parametrized reproduction of the official template's Slide 41 (code, dark, bg photo).
export default function Slide41({
  title = "Insert title here",
  body = [
    "Iaculis scelerisque nisl nisl ut etiam\neget interdum tortor enim enim quis\npurus orci eget est elit orci tempus sit\nfringilla porttitor lacinia vitae.",
    "accumsan auctor sit ornare tempor\nlectus volutpat id mauris nullam\nvenenatis rutrum adipiscing egestas\nviverra quis morbi leo pretium libero\nvelit nulla eget et ornare gravida.",
  ],
  code = DEFAULT_CODE,
  language = "js",
  fontSize = 22,
}: Slide41Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-7cfded07c9.png" /></Place>
      <Place x={643.06} y={0} w={109} h={108.55}><Photo src="img-16976e8428.png" /></Place>
      <Place x={885.1} y={148.2} w={948.1} h={832.8}>
        <CodeBlock theme="dark" language={language} fontSize={fontSize} code={code} />
      </Place>
      <Place x={101} y={284.5} w={575}>
        <Stack gap={40}>
          <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={452}>{title}</Text>
          <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={558}>{body[0]}</Text>
          <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={539}>{body[1]}</Text>
        </Stack>
      </Place>
    </Slide>
  );
}
