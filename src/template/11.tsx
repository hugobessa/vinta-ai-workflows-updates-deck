import { Photo, Place, Slide, Stack, Text } from "@/lib";

export const meta = { title: "Slide 11" };

export interface Slide11Feature {
  /** Bold feature heading (black). */
  title: string;
  /** Supporting line under the heading. Use `\n` for line breaks. */
  text: string;
}

export interface Slide11Props {
  /** Main heading on the right column (black). */
  title?: string;
  /** Heading on the photo overlay, bottom-left (white). */
  overlayTitle?: string;
  /** Paragraph on the photo overlay, bottom-left (white). Use `\n` for line breaks. */
  overlayBody?: string;
  /** Up to 3 icon-row features on the right. Extra items are ignored. */
  features?: Slide11Feature[];
}

/** Feature rows flow in a single column from this top edge (shared left edge x=1151), so a
 *  taller feature pushes the ones below it down instead of overlapping them. */
const FEATURE_TOP = 303.2;
/** Vertical pitch each non-last feature reserves, so default positions are unchanged. */
const FEATURE_PITCH = [238, 233.8];

// Parametrized reproduction of the official template's Slide 11 (feature-card grid).
export default function Slide11({
  title = "Insert title here",
  overlayTitle = "Insert subtitle here",
  overlayBody = "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Etiam nec suscipit dui. Sed\ncursus nibh id risus ultrices convallis.",
  features = [
    { title: "Insert title here", text: "Aliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolortAliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolortAliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolortAliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolortAliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolort" },
    { title: "Insert title here", text: "Aliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolort" },
    { title: "Insert title here", text: "Aliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolort" },
  ],
}: Slide11Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={904} h={589.93}><Photo src="img-d19466c406.png" inner={{ x: 0, y: 0, w: 1919.97, h: 1079.99 }} /></Place>
      <Place x={0} y={606.1} w={904} h={473.89}><Photo src="img-d19466c406.png" inner={{ x: 0, y: -786.96, w: 1919.97, h: 1402.3 }} /></Place>
      <Place x={1020} y={324.8} w={94.63} h={94.35}><Photo src="img-5e30e6fbc1.png" /></Place>
      <Place x={1017} y={796.74} w={94.59} h={94.16}><Photo src="img-4f89bb6de1.png" /></Place>
      <Place x={1017} y={550.6} w={94.2} h={93.99}><Photo src="img-02060c732d.png" /></Place>
      <Place x={1015} y={113.2}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={751}>{title}</Text>
      </Place>
      {/* Overlay title + body flow in one Place; the title's minHeight reserves its original slot, so a taller title pushes the body down instead of covering it. */}
      <Place x={70.8} y={662.3} w={683}>
        <Text size={64.5} weight={700} color="#FFFFFF" leading={1.14} maxWidth={683} style={{ minHeight: 111.8 }}>{overlayTitle}</Text>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={626}>{overlayBody}</Text>
      </Place>
      <Place x={1151} y={FEATURE_TOP} w={660}>
        {features.slice(0, 3).map((f, i, arr) => (
          <div key={i} style={{ minHeight: i < arr.length - 1 ? FEATURE_PITCH[i] : undefined }}>
            <Stack gap={16}>
              <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{f.title}</Text>
              <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={641}>{f.text}</Text>
            </Stack>
          </div>
        ))}
      </Place>
    </Slide>
  );
}
