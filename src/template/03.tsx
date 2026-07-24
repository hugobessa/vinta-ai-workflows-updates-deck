import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 03" };

// Faithful reproduction of the official template's Slide 03.
export default function Slide03() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={960} y={688.94} w={187} h={187}><Photo src="img-d11aab5d90.png" /></Place>
      <Place x={773} y={688.94} w={187} h={187}><Photo src="img-d11aab5d90.png" /></Place>
      <Place x={584} y={314.94} w={187} h={187}><Photo src="img-d11aab5d90.png" /></Place>
      <Place x={584} y={501.94} w={187} h={187}><Photo src="img-d11aab5d90.png" /></Place>
      <Place x={399} y={689.94} w={187} h={187}><Photo src="img-d11aab5d90.png" /></Place>
      <Place x={399} y={128.94} w={187} h={187}><Photo src="img-d11aab5d90.png" /></Place>
      <Place x={585.51} y={129.64} w={188.37} h={186.87}><Photo src="img-c87b9ff75c.png" /></Place>
      <Place x={1334.91} y={689.05} w={187.43} h={186.66}><Photo src="img-01a5d20a1e.png" /></Place>
      <Place x={960.08} y={502.55} w={187.56} h={186.53}><Photo src="img-140dea8259.png" /></Place>
      <Place x={1335.62} y={315.63} w={186.41} h={189}><Photo src="img-14385940c0.png" /></Place>
      <Place x={1147} y={502.62} w={187.97} h={186.29}><Photo src="img-eb143288ed.png" /></Place>
      <Place x={398} y={688.94} w={187.43} h={188}><Shape n={4} fit="cover" /></Place>
      <Place x={771} y={314.94} w={189} h={188}><Photo src="img-f4d279bd96.png" /></Place>
      <Place x={1147.82} y={315.63} w={187.12} h={186.97}><Photo src="img-6ec4c3724f.png" /></Place>
      <Place x={773} y={128.94} w={185} h={186}><Photo src="img-015d60a3aa.png" /></Place>
      <Place x={585} y={688.66} w={188} h={188.28}><Photo src="img-539d343430.png" /></Place>
      <Place x={1147} y={688.94} w={188} h={187}><Photo src="img-5965735368.png" /></Place>
      <Place x={1334.86} y={315.63} w={187.51} h={186.97}><Shape n={10} fit="cover" /></Place>
      <Place x={772.96} y={689.05} w={187.17} h={187.89}><Shape n={11} fit="cover" /></Place>
      <Place x={1334.94} y={129.1} w={187.22} h={186.48}><Shape n={12} fit="cover" /></Place>
      <Place x={772.86} y={502.55} w={187.43} h={186.58}><Photo src="img-1fdc094041.png" /></Place>
      <Place x={398} y={502.31} w={188} h={186.63}><Photo src="img-6580dfbabb.png" /></Place>
      <Place x={957.87} y={129.1} w={189.78} h={186.53}><Photo src="img-72e11c6bb0.png" /></Place>
      <Place x={585.51} y={128.94} w={187.48} h={186.69}><Photo src="img-b9ecda58b4.png" /></Place>
      <Place x={960.13} y={688.53} w={187.3} h={187.42}><Photo src="img-187d5e1025.png" /></Place>
      <Place x={1147.56} y={129.1} w={187.38} h={186.53}><Photo src="img-183fb35cc6.png" /></Place>
      <Place x={585.48} y={502.6} w={187.51} h={186.45}><Shape n={19} fit="cover" /></Place>
      <Place x={1334.97} y={502.6} w={187.59} h={186.48}><Photo src="img-01c972c05f.png" /></Place>
      <Place x={958} y={315.44} w={190.6} h={187.5}><Photo src="img-f59cc7862e.png" /></Place>
      <Place x={398.08} y={128.94} w={187.92} h={186.43}><Shape n={22} fit="cover" /></Place>
      <Place x={398} y={314.94} w={187.1} h={187.92}><Photo src="img-89ab1b4f8e.png" /></Place>
      <Place x={585} y={314.94} w={187} h={188}><Photo src="img-e0bec702fb.png" /></Place>
      <Place x={67.2} y={963.5}>
        <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={873}>{"Copie as formas individualmente e cole quando achar necessário.\nNão se esqueça de respeitar os padrões e harmonia!"}</Text>
      </Place>
    </Slide>
  );
}
