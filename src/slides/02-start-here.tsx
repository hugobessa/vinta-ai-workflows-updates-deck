import { Slide19 } from "@/template";

export const meta = { title: "Start here" };

/** Onboarding — delete this once you're building. Layout: template Slide19 (see CATALOG.md). */
export default function StartHere() {
  return (
    <Slide19
      title="Build your deck"
      subtitle="This deck lives at / (src/slides/)."
      body="Import a ready layout and pass your content as props, or compose from the @/lib primitives for a bespoke slide."
      items={[
        {
          number: "01",
          title: "Add a slide",
          text: "Drop src/slides/NN-name.tsx.\nIt auto-appears, ordered by filename.",
        },
        {
          number: "02",
          title: "Pick a layout",
          text: 'Browse /template (all 50) and\nimport { SlideNN } from "@/template".',
        },
        {
          number: "03",
          title: "Read the guide",
          text: "Props live in src/template/CATALOG.md;\nAUTHORING.md covers tokens and recipes.",
        },
      ]}
    />
  );
}
