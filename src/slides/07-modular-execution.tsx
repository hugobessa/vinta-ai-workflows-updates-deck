import { Slide19 } from "@/template";

export const meta = { title: "Modular execution" };

export default function ModularExecution() {
  return (
    <Slide19
      title="Modular execution"
      subtitle="implement-plan, decomposed."
      body="A ~440-line template became a thin conductor plus three co-shipped sub-skills, wired together by a single data-driven seam."
      items={[
        {
          number: "01",
          title: "Conductor",
          text: "Parses, classifies and resolves WORKROOT, then drives the per-phase loop.",
        },
        {
          number: "02",
          title: "Sub-skills",
          text: "implement-phase, review-phase and integrate-phase — each a focused unit.",
        },
        {
          number: "03",
          title: "One seam",
          text: "Runtime if use_worktree branches collapse into a single data-driven seam.",
        },
      ]}
    />
  );
}
