import { Slide16 } from "@/template";

export const meta = { title: "Config & ergonomics" };

export default function ConfigErgonomics() {
  return (
    <Slide16
      title="Ergonomics & governance"
      items={[
        "Scoped test suites by default — run only affected apps/files per phase",
        "E2E is opt-in: Step 0 coverage question, default NO",
        "PR-size target raised to ~1500 LoC; phase granularity is now a choice",
        "Commit strategy: stacked-branches | modular-commits | ask",
        "License policy: block / warn / off with a forbidden-SPDX list",
        "AI model tiers refreshed (Sonnet 5, Opus 4.8, Gemini 3, GPT-5.6)",
        "Model IDs extracted to a data resource with a nightly freshness job",
        "DESIGN.md detection wires design docs into Cursor Project Rules",
      ]}
    />
  );
}
