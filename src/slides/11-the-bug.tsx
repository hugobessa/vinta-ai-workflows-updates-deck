import { Slide20 } from "@/template";

export const meta = { title: "The bug" };

export default function TheBug() {
  return (
    <Slide20
      kicker="0.3.0 · what went wrong"
      statement={"Two worktrees,\ntwo Postgres\npostmasters,\none PGDATA."}
    />
  );
}
