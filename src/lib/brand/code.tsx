import type { CSSProperties } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";

/** Dark window theme — matches the template's `.code-dark`. */
const DARK: PrismTheme = {
  plain: { color: "#e7ecff", backgroundColor: "#0b1021" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#5b6690", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#9fb0e0" } },
    { types: ["keyword", "boolean", "atrule", "operator", "selector"], style: { color: "#7aa2ff" } },
    { types: ["string", "char", "attr-value", "regex", "inserted"], style: { color: "#8ce6a8" } },
    { types: ["number", "function", "class-name", "tag", "constant", "symbol", "builtin", "property"], style: { color: "#f0a35e" } },
    { types: ["variable", "attr-name"], style: { color: "#c7d3ff" } },
  ],
};

/** Light window theme — matches the template's `.code-light`. */
const LIGHT: PrismTheme = {
  plain: { color: "#2b3450", backgroundColor: "#fbfbfd" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#8a93ab", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#5a6378" } },
    { types: ["keyword", "boolean", "atrule", "operator", "selector"], style: { color: "#0052ff" } },
    { types: ["string", "char", "attr-value", "regex", "inserted"], style: { color: "#1a9e5a" } },
    { types: ["number", "function", "class-name", "tag", "constant", "symbol", "builtin", "property"], style: { color: "#c0603a" } },
    { types: ["variable", "attr-name"], style: { color: "#3a4253" } },
  ],
};

export interface CodeBlockProps {
  /** The source to render. Leading/trailing blank lines are trimmed. */
  code: string;
  /** Prism language id (js, ts, tsx, bash, json, python…). Default `tsx`. */
  language?: string;
  theme?: "dark" | "light";
  /** Show the macOS traffic-light dots. Default true. */
  dots?: boolean;
  /** Code font size in slide px. Default 22. */
  fontSize?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * A syntax-highlighted "editor window" — rounded, shadowed, with traffic-light
 * dots. Fills its parent box; size and position it with `<Place>`.
 *
 * @example
 * <Place x={980} y={230} w={820} h={560}>
 *   <CodeBlock language="ts" code={`const compose = (...fns) => x => fns.reduceRight((v,f)=>f(v), x)`} />
 * </Place>
 */
export function CodeBlock({
  code,
  language = "tsx",
  theme = "dark",
  dots = true,
  fontSize = 22,
  className = "",
  style,
}: CodeBlockProps) {
  const t = theme === "dark" ? DARK : LIGHT;
  return (
    <div
      className={`code-win relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: t.plain.backgroundColor,
        borderRadius: 14,
        boxShadow: "0 24px 60px rgba(0,0,0,.28)",
        border: theme === "light" ? "1px solid #ececf3" : undefined,
        ...style,
      }}
    >
      {dots && (
        <div className="code-dots absolute left-[22px] top-[20px] z-[2]">
          <i /><i /><i />
        </div>
      )}
      <Highlight code={code.replace(/^\n+|\n+$/g, "")} language={language} theme={t}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            className="m-0 h-full overflow-auto font-mono"
            style={{
              padding: dots ? "58px 30px 28px" : "28px 30px",
              fontSize,
              lineHeight: 1.62,
              // Wrap over-long lines instead of clipping them at the window edge
              // (which also let overflow leak off-slide in PDF/PPTX exports).
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              color: t.plain.color,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
