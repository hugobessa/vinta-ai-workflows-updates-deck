import { Slide19 } from "@/template";

export const meta = { title: "Worktrees" };

export default function Worktrees() {
  return (
    <Slide19
      title="Parallel git worktrees"
      subtitle="One runnable checkout per phase."
      body="The new prepare-worktree skill provisions a worktree and decides, per path, how to reuse state — so phases can run in parallel without stepping on each other."
      items={[
        {
          number: "01",
          title: "Opt in per run",
          text: "implement-plan Step 0 (c) provisions one worktree, reused across phases and mid-plan resumes.",
        },
        {
          number: "02",
          title: "Per-path strategy",
          text: "Symlink read-only reuse, copy defensively, or fork anything that would corrupt shared state.",
        },
        {
          number: "03",
          title: "Configurable",
          text: ".vinta-ai-workflows.yaml: worktree_root, deps_strategy, compose_network, test_db_strategy.",
        },
      ]}
    />
  );
}
