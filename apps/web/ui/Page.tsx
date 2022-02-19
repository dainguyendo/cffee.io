import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Plus, Tool, Watch } from "react-feather";
import { Box, Flex, List, styled } from "ui";
import { UserDropdownMenu } from "../ui/UserDropdownMenu";
import { Cffee } from "./Cffee";
import { FullBleedLayout } from "./FullBleedLayout";
import { MenuNavigation } from "./MenuNavigation";
import { NavigationAnchor } from "./NavigationAnchor";
import { usePathnameMatch } from "./usePathnameMatch";

const ListItem = styled("li", {
  display: "flex",
  gap: "$2",
  alignItems: "center",
});

const SideNavigation = styled("nav", {
  display: "none",
  "@bp1": {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});

export const Page: React.FC = ({ children }) => {
  const { data: session } = useSession();

  const { isHomeActive, isEquipmentActive, isTimerActive } = usePathnameMatch();

  return (
    <>
      <FullBleedLayout css={{ minHeight: "100vh" }}>
        <Flex css={{ gap: "$5" }}>
          <SideNavigation
            css={{
              p: "$4",
              flex: "0 99999 200px",
            }}
          >
            <Cffee />

            <Link href="/brew" passHref>
              <NavigationAnchor active={true} css={{ width: "fit-content" }}>
                <Plus size={24} />
                {/* New log */}
              </NavigationAnchor>
            </Link>

            <List
              css={{
                display: "flex",
                fd: "column",
                gap: "$2",
              }}
            >
              <ListItem>
                <Link href="/home" passHref>
                  <NavigationAnchor active={isHomeActive}>
                    <BookOpen size={24} />
                    {/* Journal */}
                  </NavigationAnchor>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/equipment" passHref>
                  <NavigationAnchor active={isEquipmentActive}>
                    <Tool size={24} />
                    {/* Equipment */}
                  </NavigationAnchor>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/timer" passHref>
                  <NavigationAnchor active={isTimerActive}>
                    <Watch size={24} />
                    {/* Timer */}
                  </NavigationAnchor>
                </Link>
              </ListItem>
            </List>

            <UserDropdownMenu user={session!.user!} />
          </SideNavigation>
          <Box css={{ flexGrow: 1, px: "$2", "@bp1": { px: 0 } }}>
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
          </Box>
        </Flex>
      </FullBleedLayout>
    </>
  );
};
