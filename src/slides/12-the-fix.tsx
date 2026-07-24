import { Slide18 } from "@/template";

export const meta = { title: "The fix" };

export default function TheFix() {
  return (
    <Slide18
      items={[
        {
          number: "01",
          title: "Compose override",
          text: "gen-compose-worktree-override.sh detects isolation leaks from docker compose config.",
        },
        {
          number: "02",
          title: "Fork volumes",
          text: "External / fixed volumes become non-external, namespaced variants; host ports stripped.",
        },
        {
          number: "03",
          title: "shared_volumes",
          text: "Opt read-only caches back into sharing via the --share-volume flag.",
        },
        {
          number: "04",
          title: "Step 4a check",
          text: "Boots the worktree DB and asserts its volume name differs from main before stacks run together.",
        },
        {
          number: "05",
          title: "Step 3b guidance",
          text: "Now leads with universal principles; pytest, vitest, Go, Cargo, Rails as equal examples.",
        },
      ]}
    />
  );
}
