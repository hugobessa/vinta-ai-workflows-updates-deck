import { PieChart, type PieDatum, Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 24" };

export interface Slide24Datum extends PieDatum {
  /** Legend text for this slice. */
  label?: string;
}

export interface Slide24Props {
  /** Heading on the left (black). Use `\n` for line breaks. */
  title?: string;
  /** Pie slices (value + color). Sizes, on-slice `%` and the legend all derive from this. */
  data?: Slide24Datum[];
}

/** Title's reserved height (original title y 237.1 → first legend at 489.6). */
const TITLE_SLOT = 252.5;
/** Legend left edge (288.4) minus the title's left edge (276.4). */
const LEGEND_INDENT = 12;
/** Vertical pitch between legend rows. */
const LEGEND_PITCH = 79;

// Parametrized reproduction of the official template's Slide 24 (pie chart + legend).
export default function Slide24({
  title = "Insert text\nhere",
  data = [
    { label: "Insert text here", value: 1, color: "#0052ff", labelColor: "#ffffff" },
    { label: "Insert text here", value: 1, color: "#0b1220", labelColor: "#ffffff" },
    { label: "Insert text here", value: 1, color: "#d9d9d9", labelColor: "#000000" },
  ],
}: Slide24Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1560.77} y={-2.25} w={359.23} h={358.89}><Photo src="img-12269fea93.png" inner={{ x: -1560.75, y: 0, w: 1919.97, h: 1079.99 }} /></Place>
      <Place x={0} y={-2.25} w={359.23} h={358.89}><Photo src="img-12269fea93.png" inner={{ x: 0, y: -20.84, w: 1919.97, h: 1079.95 }} /></Place>
      <Place x={0} y={700.25} w={359.23} h={379.75}><Photo src="img-12269fea93.png" inner={{ x: 0, y: -593.63, w: 1919.97, h: 1079.96 }} /></Place>
      <Place x={879} y={225.95} w={680} h={680}>
        <PieChart data={data} size={680} />
      </Place>
      {/* Title + legend flow in one Place; the title's minHeight reserves its slot and each
          legend row reserves its pitch, so a taller title/label pushes what's below it down. */}
      <Place x={276.4} y={237.1} w={487}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487} style={{ minHeight: TITLE_SLOT }}>{title}</Text>
        {data.slice(0, 3).map((d, i, arr) => (
          <div key={i} style={{ marginLeft: LEGEND_INDENT, minHeight: i < arr.length - 1 ? LEGEND_PITCH : undefined }}>
            <div className="flex items-center" style={{ gap: 20 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9999, background: d.color, flexShrink: 0 }} />
              <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={261}>{d.label}</Text>
            </div>
          </div>
        ))}
      </Place>
    </Slide>
  );
}
