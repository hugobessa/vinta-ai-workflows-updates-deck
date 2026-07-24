import { Photo, Place, Slide } from "@/lib";

export const meta = { title: "Slide 50" };

// Faithful reproduction of the official template's Slide 50.
export default function Slide50() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-a0512e4cef.png" /></Place>
    </Slide>
  );
}
