import { CodeBlock, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Sandboxing" };

// Structural copy of template Slide 38 (dark code + side topics) with the title
// recolored to ink — the template default renders it white, invisible on white.
const TOPIC_POS = [{ y: 318.3 }, { y: 469.5 }, { y: 620.7 }, { y: 771.9 }];

const code = `# macOS: sandbox-exec  ·  Linux: bwrap
sandbox-run.sh \\
  --deny  "$MAIN_CHECKOUT" \\
  --allow "$WORKTREE" \\
  --allow "$MAIN_CHECKOUT/.git" \\
  -- pytest

# stray write to main → EROFS`;

const topics = [
  "OS sandbox:\nsandbox-exec / bwrap",
  "PreToolUse write-\nguard hook",
  "Auto-wires\n.claude/settings.json",
  "Layer 1 backstop\ncatches the rest",
];

export default function Sandboxing() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1847.2} y={145.26} w={72.8} h={72.6}><Shape n={10} fit="cover" flipX flipY /></Place>
      <Place x={1767.25} y={0} w={152.67} h={151.77}><Shape n={20} fit="cover" flipX flipY /></Place>
      <Place x={101} y={190} w={1181.3} h={807.5}>
        <CodeBlock theme="dark" language="bash" fontSize={27} code={code} />
      </Place>
      <Place x={101} y={80}>
        <Text size={51.6} weight={700} color="#101828" leading={1.14} maxWidth={1000}>
          Writes stay inside the worktree
        </Text>
      </Place>
      {topics.slice(0, 4).map((t, i) => (
        <Place key={i} x={1440} y={TOPIC_POS[i].y}>
          <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={312}>{t}</Text>
        </Place>
      ))}
    </Slide>
  );
}
