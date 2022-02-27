import { Box, Text } from "ui";
import { Blur } from "../ui/Blur";
import { Cffee } from "../ui/Cffee";
import { FullBleedLayout } from "../ui/FullBleedLayout";
import { LandingNavigation } from "../ui/LandingNavigation";

export default function Web() {
  return (
    <>
      <Box
        aria-hidden
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Blur />
      </Box>
      <FullBleedLayout
        css={{
          height: "100vh",
          px: "$3",
        }}
      >
        <LandingNavigation />
        <main>
          <Cffee layout />
        </main>
      </FullBleedLayout>
    </>
  );
}
