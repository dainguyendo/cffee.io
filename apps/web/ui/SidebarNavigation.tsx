import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Plus, Tool, Watch } from "react-feather";
import { Box, List, Spacer, styled } from "ui";
import { UserDropdownMenu } from "../ui/UserDropdownMenu";
import { Cffee } from "./Cffee";
import { NavigationAnchor } from "./NavigationAnchor";
import { usePathnameMatch } from "./usePathnameMatch";

const ListItem = styled("li", {
  display: "flex",
  gap: "$2",
  alignItems: "center",
});

const SideNavigation = styled("nav", {
  display: "none",
  background: "$background",
  "@bp1": {
    display: "flex",
    flexDirection: "column",
    padding: "$6",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
});

export const SidebarNavigation = () => {
  const { data: session } = useSession();
  const { isHomeActive, isEquipmentActive, isTimerActive } = usePathnameMatch();
  return (
    <SideNavigation>
      <Box css={{ flexGrow: 1 }}>
        <Cffee />
      </Box>
      <Spacer size="6" />

      <Link href="/brew" passHref>
        <NavigationAnchor active={true} css={{ width: "fit-content" }}>
          <Plus size={24} />
          New log
        </NavigationAnchor>
      </Link>

      <Spacer size="6" />

      <List
        css={{
          display: "flex",
          fd: "column",
          gap: "$2",
          flexGrow: 1,
        }}
      >
        <ListItem>
          <Link href="/home" passHref>
            <NavigationAnchor active={isHomeActive}>
              <BookOpen size={24} />
              Journal
            </NavigationAnchor>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/equipment" passHref>
            <NavigationAnchor active={isEquipmentActive}>
              <Tool size={24} />
              Equipment
            </NavigationAnchor>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/timer" passHref>
            <NavigationAnchor active={isTimerActive}>
              <Watch size={24} />
              Timer
            </NavigationAnchor>
          </Link>
        </ListItem>
      </List>

      <UserDropdownMenu user={session!.user!} side="top" align="end" />
    </SideNavigation>
  );
};
