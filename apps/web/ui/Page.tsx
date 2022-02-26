import { Box, Flex, styled } from "ui";
import { Cffee } from "./Cffee";
import { MenuNavigation } from "./MenuNavigation";
import { SidebarLayout } from "./SidebarLayout";
import { SidebarNavigation } from "./SidebarNavigation";

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
      <SidebarNavigation />
      <Container css={{ background: "$background" }}>
        <MainContent>
          <Flex
            css={{
              alignItems: "baseline",
              justifyContent: "space-between",
              "@bp1": {
                display: "none",
              },
            }}
          >
            <Cffee />
            <MenuNavigation />
          </Flex>

          {children}
        </MainContent>
      </Container>
    </SidebarLayout>
  );
};
