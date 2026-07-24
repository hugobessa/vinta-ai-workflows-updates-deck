import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 01" };

// Faithful reproduction of the official template's Slide 01.
export default function Slide01() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={960} y={662.47} w={187} h={187}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={773} y={662.47} w={187} h={187}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={584} y={288.47} w={187} h={187}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={584} y={475.47} w={187} h={187}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={399} y={663.47} w={187} h={187}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={399} y={102.47} w={187} h={187}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={585.51} y={103.17} w={188.37} h={186.87}><Photo src="img-382e56e6d8.png" /></Place>
      <Place x={1334.91} y={662.58} w={187.43} h={186.66}><Shape n={1} fit="cover" /></Place>
      <Place x={960.08} y={476.08} w={187.56} h={186.53}><Shape n={2} fit="cover" /></Place>
      <Place x={1335.62} y={289.15} w={186.41} h={189}><Photo src="img-cf12f684cf.png" /></Place>
      <Place x={1147} y={476.15} w={187.97} h={186.29}><Shape n={3} fit="cover" /></Place>
      <Place x={398} y={662.47} w={187.43} h={188}><Shape n={4} fit="cover" /></Place>
      <Place x={771} y={288.47} w={189} h={188}><Shape n={5} fit="cover" /></Place>
      <Place x={1147.82} y={289.15} w={187.12} h={186.97}><Shape n={6} fit="cover" /></Place>
      <Place x={773} y={102.47} w={185} h={186}><Shape n={7} fit="cover" /></Place>
      <Place x={585} y={662.19} w={188} h={188.28}><Shape n={8} fit="cover" /></Place>
      <Place x={1147} y={662.47} w={188} h={187}><Shape n={9} fit="cover" /></Place>
      <Place x={1334.86} y={289.15} w={187.51} h={186.97}><Shape n={10} fit="cover" /></Place>
      <Place x={772.96} y={662.58} w={187.17} h={187.89}><Shape n={11} fit="cover" /></Place>
      <Place x={1334.94} y={102.63} w={187.22} h={186.48}><Shape n={12} fit="cover" /></Place>
      <Place x={772.86} y={476.08} w={187.43} h={186.58}><Shape n={13} fit="cover" /></Place>
      <Place x={398} y={475.84} w={188} h={186.63}><Shape n={14} fit="cover" /></Place>
      <Place x={957.87} y={102.63} w={189.78} h={186.53}><Shape n={15} fit="cover" /></Place>
      <Place x={585.51} y={102.47} w={187.48} h={186.69}><Shape n={16} fit="cover" /></Place>
      <Place x={960.13} y={662.06} w={187.3} h={187.42}><Shape n={17} fit="cover" /></Place>
      <Place x={1147.56} y={102.63} w={187.38} h={186.53}><Shape n={18} fit="cover" /></Place>
      <Place x={585.48} y={476.13} w={187.51} h={186.45}><Shape n={19} fit="cover" /></Place>
      <Place x={629.05} y={476.13} w={99.49} h={43.54}><Photo src="img-28ba267fe3.png" /></Place>
      <Place x={1334.97} y={476.13} w={187.59} h={186.48}><Shape n={20} fit="cover" /></Place>
      <Place x={958} y={288.97} w={190.6} h={187.5}><Shape n={21} fit="cover" /></Place>
      <Place x={398.08} y={102.47} w={187.92} h={186.43}><Shape n={22} fit="cover" /></Place>
      <Place x={398} y={288.47} w={187.1} h={187.92}><Shape n={23} fit="cover" /></Place>
      <Place x={585} y={288.47} w={187} h={188}><Shape n={24} fit="cover" /></Place>
      <Place x={67.2} y={963.5}>
        <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={873}>{"Copie as formas individualmente e cole quando achar necessário.\nNão se esqueça de respeitar os padrões e harmonia!"}</Text>
      </Place>
    </Slide>
  );
}
