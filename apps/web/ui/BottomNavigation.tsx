import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Plus, Tool, Watch } from "react-feather";
import { Box, Flex, styled, theme, VisuallyHidden } from "ui";
import { Center } from "./Center";
import { usePathnameMatch } from "./usePathnameMatch";
import { UserDropdownMenu } from "./UserDropdownMenu";

const Container = styled(Flex, {
  padding: "$4",
  borderRadius: "$large",
  backdropFilter: "blur(10px)",
  background: "$gray100",
  justifyContent: "space-around",
  width: "90vw",
});

const IconButton = styled("div", {
  display: "grid",
  placeItems: "center",
  padding: "$2",
  borderRadius: "$medium",
  background: "$purple100",
  size: 48,
});

export const BottomNavigation = () => {
  const { data: session } = useSession();
  const { isHomeActive, isEquipmentActive, isTimerActive } = usePathnameMatch();

  return (
    <Box
      css={{
        width: "100vw",
        position: "absolute",
        bottom: "$2",
        "@bp1": {
          display: "none",
        },
      }}
    >
      <Center>
        <Container as="nav">
          <Link href="/brew">
            <a>
              <IconButton>
                <Plus size={28} color={theme.colors.purple600.value} />
                <VisuallyHidden>New brew</VisuallyHidden>
              </IconButton>
            </a>
          </Link>
          <Link href="/home">
            <a>
              <IconButton>
                <BookOpen
                  size={28}
                  color={
                    isHomeActive
                      ? theme.colors.purple600.value
                      : theme.colors.gray500.value
                  }
                />
                <VisuallyHidden>Home</VisuallyHidden>
              </IconButton>
            </a>
          </Link>
          <Link href="/equipment">
            <a>
              <IconButton>
                <Tool
                  size={28}
                  color={
                    isEquipmentActive
                      ? theme.colors.purple600.value
                      : theme.colors.gray500.value
                  }
                />
                <VisuallyHidden>Equipment</VisuallyHidden>
              </IconButton>
            </a>
          </Link>
          <Link href="/timer">
            <a>
              <IconButton>
                <Watch
                  size={28}
                  color={
                    isTimerActive
                      ? theme.colors.purple600.value
                      : theme.colors.gray500.value
                  }
                />
                <VisuallyHidden>Timer</VisuallyHidden>
              </IconButton>
            </a>
          </Link>
          {/* <UserDropdownMenu user={session!.user!} /> */}
        </Container>
      </Center>
    </Box>
  );
};
