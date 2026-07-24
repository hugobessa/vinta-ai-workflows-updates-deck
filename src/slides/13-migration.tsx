import { Slide16 } from "@/template";

export const meta = { title: "How to adopt" };

export default function Migration() {
  return (
    <Slide16
      title="Upgrading to 0.3.0"
      items={[
        "Regenerate Compose overrides with gen-compose-worktree-override.sh",
        "Verify worktree DB volume names differ from the main checkout",
        "List read-only caches in shared_volumes to keep them shared",
        "New projects get Step 4a checks and stack-agnostic guidance by default",
      ]}
    />
  );
}
