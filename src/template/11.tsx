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

/** Fixed feature-row top edges (shared left edge x=1151), one per icon. */
const FEATURE_Y = [303.2, 541.2, 775];

// Parametrized reproduction of the official template's Slide 11 (feature-card grid).
export default function Slide11({
  title = "Insert title here",
  overlayTitle = "Insert subtitle here",
  overlayBody = "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Etiam nec suscipit dui. Sed\ncursus nibh id risus ultrices convallis.",
  features = [
    { title: "Insert title here", text: "Aliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolort" },
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
      <Place x={70.8} y={662.3}>
        <Text size={64.5} weight={700} color="#FFFFFF" leading={1.14} maxWidth={683}>{overlayTitle}</Text>
      </Place>
      <Place x={70.8} y={774.1}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={626}>{overlayBody}</Text>
      </Place>
      {features.slice(0, 3).map((f, i) => (
        <Place key={i} x={1151} y={FEATURE_Y[i]} w={660}>
          <Stack gap={16}>
            <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{f.title}</Text>
            <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={641}>{f.text}</Text>
          </Stack>
        </Place>
      ))}
    </Slide>
  );
}
