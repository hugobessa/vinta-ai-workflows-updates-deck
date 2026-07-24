import { Slide22 } from "@/template";

export const meta = { title: "TL;DR" };

export default function Tldr() {
  return (
    <Slide22
      stats={[
        { value: "2", caption: "releases · Jul 15 & 17, 2026" },
        { value: "5", caption: "new foundation skills" },
        { value: "1", caption: "critical data-corruption fix" },
      ]}
      title="Two releases, one story"
      body="0.2.0 made the workflows parallel-safe and modular. Two days later, 0.3.0 fixed the data-corruption bug that parallelism exposed."
    />
  );
}
