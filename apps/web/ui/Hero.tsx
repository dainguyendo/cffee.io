import { Box, styled, Text } from "ui";
import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { SpillingCoffeeModel } from "./SpillingCoffeeModel";

const HeroContainer = styled(Box, {
  background:
    "linear-gradient(62deg, #f37286 0%, #ef81ae 16%, #ec90cc 33%, #ea9ee2 50%, #d6b5e8 66%, #d0c5e8 83%, #d2d2e9 100%)",
  // display: "grid",
  // gridTemplateColumns: "1.5fr 1fr",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  position: "relative",
  // minHeight: "475px",
  p: "$8",
});

type Props = React.ComponentProps<typeof Box>;

export const Hero = (props: Props) => {
  const ref = useRef();
  return (
    <HeroContainer {...props}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "125%",
          width: "55%",
        }}
      >
        <Canvas dpr={[1, 2]} camera={{ fov: 35 }}>
          <Suspense fallback={null}>
            <Stage
              controls={ref}
              preset="rembrandt"
              intensity={1}
              environment="city"
            >
              <SpillingCoffeeModel />
            </Stage>
          </Suspense>
          <OrbitControls ref={ref} autoRotate />
        </Canvas>
      </div>
      <Text
        as="h1"
        css={{
          fontWeight: "$bold",
          fontSize: "$7",
          color: "$gray600",
          ta: "end",
        }}
      >
        Brew. Drink.<br></br>& Take note
      </Text>
      <Text
        as="p"
        css={{ fontSize: "$5", color: "$gray500", width: "65%", ta: "end" }}
      >
        Focus on enjoying your coffee.
      </Text>
      <Text
        as="p"
        css={{ fontSize: "$5", color: "$gray500", width: "65%", ta: "end" }}
      >
        Remember what got you there.
      </Text>
    </HeroContainer>
  );
};
