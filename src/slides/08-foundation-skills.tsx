import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "New skills" };

// Structural copy of template Slide 15 (blue-section card grid) with a title added.
const CARD_POS = [
  { x: 180, ty: 356.2, sy: 416.2 },
  { x: 734.5, ty: 356.4, sy: 416.4 },
  { x: 1289, ty: 356.1, sy: 416.1 },
  { x: 180, ty: 691.5, sy: 751.5 },
  { x: 734.5, ty: 691, sy: 751 },
  { x: 1289, ty: 691.2, sy: 751.2 },
];

const cards = [
  { title: "handoff", text: "Session-continuation notes:\ngoal, verified state, decisions,\nlandmines, next step." },
  { title: "handoff-to-client", text: "API-change docs for clients:\nendpoints, auth, breaking\nflags, migration notes." },
  { title: "deslop-comments", text: "Simple-English cleanup of\ntouched comments. Wired\ninto review Layer 2." },
  { title: "thermo-nuclear", text: "Deep code-quality audit that\nhunts code-judo reframes.\nThe review's Layer 3." },
  { title: "prepare-worktree", text: "Fully-runnable worktrees for\nparallel work; symlink / copy /\nfork chosen per path." },
  { title: "agent_models config", text: "Map reviewer, fixer & prep\nsteps to cost tiers 1–4,\nwith per-phase overrides." },
];

export default function FoundationSkills() {
  return (
    <Slide bg="blue-section" pad={false}>
      <Place x={0} y={0} w={1930.56} h={1079.99}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: 0, w: 2120.33, h: 1192.63 }} /></Place>
      <Place x={180} y={120}>
        <Text size={64} weight={700} color="#FFFFFF" leading={1.1} maxWidth={1560}>Five new foundation skills</Text>
      </Place>
      <Place x={185} y={252.19} w={446} h={240.28}><Photo src="img-7b6555cbba.png" /></Place>
      <Place x={185} y={587.19} w={446} h={240.62}><Photo src="img-2d740c45b6.png" /></Place>
      <Place x={737} y={252.19} w={446} h={240.46}><Photo src="img-c5ead63246.png" /></Place>
      <Place x={737} y={587.19} w={446} h={240.07}><Photo src="img-7d567e09a3.png" /></Place>
      <Place x={1289} y={252.19} w={446} h={240.19}><Photo src="img-6963d3e042.png" /></Place>
      <Place x={1289} y={587.19} w={446} h={240.33}><Photo src="img-1b6dcd00dc.png" /></Place>
      {cards.slice(0, 6).map((c, i) => {
        const p = CARD_POS[i];
        return (
          <Fragment key={i}>
            <Place x={p.x} y={p.ty}>
              <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409}>{`${i + 1}. ${c.title}`}</Text>
            </Place>
            <Place x={p.x} y={p.sy}>
              <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{c.text}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
