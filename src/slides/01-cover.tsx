import { Slide05 } from "@/template";

export const meta = { title: "Cover" };

export default function Cover() {
  return (
    <Slide05
      title={"What's new in\nvinta-ai-workflows"}
      meta={[
        { label: "Releases", value: "0.2.0 & 0.3.0" },
        { label: "Dates", value: "Jul 15–17, 2026" },
        { label: "Theme", value: "Parallel-safe workflows" },
      ]}
    />
  );
}
