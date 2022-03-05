import { Box, Flex, styled } from "ui";
import { Blur } from "./Blur";
import { Cffee } from "./Cffee";
import { MenuNavigation } from "./MenuNavigation";
import { SidebarLayout } from "./SidebarLayout";

const MainContent = styled("div", {
  maxWidth: "105ch",
  margin: "0 auto",
});

const Container = styled(Box, {
  minHeight: "100vh",
  padding: "$2",
  "@bp2": {
    padding: "$4",
  },
  bp3: {
    padding: "$7",
  },
});

export const Page: React.FC = ({ children }) => {
  return (
    <SidebarLayout>
      <Container css={{ position: "relative" }}>
        <MainContent>
          <Flex
            css={{
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Cffee />
            <MenuNavigation />
          </Flex>

          {children}

          <Box
            aria-hidden
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              width: "100%",
              height: "100vh",
            }}
          >
            <Blur />
          </Box>
        </MainContent>
      </Container>
    </SidebarLayout>
  );
};
