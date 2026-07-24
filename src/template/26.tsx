import { Donut, Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 26" };

export interface Slide26Panel {
  /** Big number in the gauge center (white), e.g. "10M". */
  stat: string;
  /** Gauge fill, 0–1. Drives how much of the ring is drawn. */
  percent?: number;
  /** Short heading under the gauge (white). */
  title: string;
  /** Caption under the heading (white). Use `\n` for line breaks. */
  caption: string;
  /** Arc color override (defaults to the deep-blue ring). */
  color?: string;
}

export interface Slide26Props {
  /** Up to 3 panels (gauge + stat + title + caption). Extra items are ignored. */
  panels?: Slide26Panel[];
}

/** Fixed 3-column slots — gauge center x and the text-column x, preserved from the original. */
const PANEL_POS = [
  { cx: 345.4, textX: 95.4 },
  { cx: 960, textX: 710 },
  { cx: 1561.1, textX: 1311.1 },
];

const GAUGE = 400;
/** Gauge top — sits it low enough that its base nearly meets the title below. */
const GAUGE_Y = 250;

// Parametrized reproduction of the official template's Slide 26 (3-panel radial gauges).
export default function Slide26({
  panels = [
    { stat: "10M", percent: 0.25, title: "Insert text here", caption: "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis" },
    { stat: "10M", percent: 0.66, title: "Insert text here", caption: "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis" },
    { stat: "10M", percent: 0.25, title: "Insert text here", caption: "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis" },
  ],
}: Slide26Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-34260598bb.png" /></Place>
      <Place x={0} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={742.99} y={1006.43} w={373.84} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.17, h: 461.86 }} /></Place>
      <Place x={1108.83} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={1851.82} y={1006.43} w={68.18} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.1, h: 461.86 }} /></Place>
      {panels.slice(0, 3).map((p, i) => {
        const pos = PANEL_POS[i];
        return (
          <Fragment key={i}>
            <Place x={pos.cx - GAUGE / 2} y={GAUGE_Y}>
              <Donut
                percent={p.percent ?? 0.5}
                value={p.stat}
                size={GAUGE}
                thickness={62}
                color={p.color ?? "#0040c8"}
                track="rgba(255,255,255,0.18)"
                valueColor="#ffffff"
              />
            </Place>
            <Place x={pos.textX} y={697.7} w={500}>
              <Text size={51.6} weight={700} color="#FFFFFF" align="center" leading={1.14}>{p.title}</Text>
            </Place>
            <Place x={pos.textX} y={792.7} w={500}>
              <Text size={24.7} weight={500} color="#FFFFFF" align="center" leading={1.32}>{p.caption}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
