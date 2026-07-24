import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 20" };

export interface Slide20Props {
  /** Small label above the statement (white). */
  kicker?: string;
  /** Large statement (white). Use `\n` for line breaks. */
  statement?: string;
}

// Parametrized reproduction of the official template's Slide 20 (big statement over photo).
export default function Slide20({
  kicker = "Text",
  statement = "Edit the\nvery long copy\non this box",
}: Slide20Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-bdb40f5afb.png" /></Place>
      <Place x={0} y={0} w={403} h={402}><Photo src="img-c656df62d1.png" /></Place>
      <Place x={1010.33} y={98.03} w={817.54} h={764.12}><Photo src="img-bdb40f5afb.png" inner={{ x: -1000.98, y: -106.82, w: 1919.97, h: 1080 }} /></Place>
      {/* Kicker + statement flow in one Place; the kicker's minHeight reserves its original slot, so a taller kicker pushes the statement down instead of covering it. */}
      <Place x={101} y={539.1} w={702}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200} style={{ minHeight: 65.5 }}>{kicker}</Text>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={702}>{statement}</Text>
      </Place>
    </Slide>
  );
}
