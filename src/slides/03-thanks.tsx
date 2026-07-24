import { Slide48 } from "@/template";

export const meta = { title: "Thank you" };

/** Starter closing slide — other closings in CATALOG.md (45, 46, 47, 49). */
export default function Thanks() {
  return (
    <Slide48
      title="Thank you!"
      contacts={[{ label: "Email", value: "contact@vintasoftware.com" }]}
    />
  );
}
