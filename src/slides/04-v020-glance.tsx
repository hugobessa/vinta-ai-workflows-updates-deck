import { Slide14 } from "@/template";

export const meta = { title: "0.2.0 at a glance" };

export default function V020Glance() {
  return (
    <Slide14
      items={[
        { number: "01", title: "Parallel git worktrees" },
        { number: "02", title: "Filesystem sandboxing" },
        { number: "03", title: "Modular plan execution" },
        { number: "04", title: "Five new foundation skills" },
        { number: "05", title: "Test & PR-size ergonomics" },
        { number: "06", title: "Config & governance" },
      ]}
    />
  );
}
