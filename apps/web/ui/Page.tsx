import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Plus, Tool, Watch } from "react-feather";
import { Box, Flex, List, Separator, styled, Text, theme } from "ui";
import { UserDropdownMenu } from "../ui/UserDropdownMenu";
import { FullBleedLayout } from "./FullBleedLayout";
import { NavigationText } from "../ui/NavigationText";
import { BottomNavigation } from "./BottomNavigation";
import { usePathnameMatch } from "./usePathnameMatch";

const ListItem = styled("li", {
  display: "flex",
  gap: "$2",
  alignItems: "center",
});

const Container = styled("div", {
  display: "flex",
  gap: "$3",
  alignItems: "center",
  padding: "$2",
  borderRadius: "$medium",

  "@bp2": {
    padding: "$4",
  },

  variants: {
    outline: {
      true: {
        background: "$purple100",
      },
    },
  },
  defaultVariants: {
    outline: false,
  },
});

const SideNavigation = styled("nav", {
  display: "none",
  "@bp1": {
    display: "block",
  },
});

export const Page: React.FC = ({ children }) => {
  const { data: session } = useSession();

  const { isHomeActive, isEquipmentActive, isTimerActive } = usePathnameMatch();

  return (
    <>
      <FullBleedLayout css={{ minHeight: "100vh" }}>
        <Flex css={{ gap: "$5" }}>
          <SideNavigation css={{ p: "$4", flexGrow: 0, flexShrink: "99999" }}>
            <Text bold css={{ fontSize: "$4" }}>
              cffee
            </Text>

            <Separator css={{ my: "$4", backgroundColor: "$gray100" }} />

            <Link href="/brew" passHref>
              <a>
                <Container outline>
                  <Plus size={24} color={theme.colors.purple600.value} />
                  <NavigationText bold color="$purple600">
                    New log
                  </NavigationText>
                </Container>
              </a>
            </Link>

            <Separator decorative css={{ my: "$2" }} />

            <List css={{ gap: "$2", "@bp2": { gap: "$4" } }}>
              <ListItem>
                <Link href="/home">
                  <a>
                    <Container>
                      <BookOpen
                        size={24}
                        color={
                          isHomeActive
                            ? theme.colors.purple600.value
                            : theme.colors.gray500.value
                        }
                      />
                      <NavigationText
                        color={isHomeActive ? "$purple600" : "$gray500"}
                      >
                        Journal
                      </NavigationText>
                    </Container>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/equipment">
                  <a>
                    <Container>
                      <Tool
                        size={24}
                        color={
                          isEquipmentActive
                            ? theme.colors.purple600.value
                            : theme.colors.gray500.value
                        }
                      />
                      <NavigationText
                        color={isEquipmentActive ? "$purple600" : "$gray500"}
                      >
                        Equipment
                      </NavigationText>
                    </Container>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/timer">
                  <a>
                    <Container>
                      <Watch
                        size={24}
                        color={
                          isTimerActive
                            ? theme.colors.purple600.value
                            : theme.colors.gray500.value
                        }
                      />
                      <NavigationText
                        color={isTimerActive ? "$purple600" : "$gray500"}
                      >
                        Timer
                      </NavigationText>
                    </Container>
                  </a>
                </Link>
              </ListItem>
            </List>
            <Separator css={{ my: "$4", backgroundColor: "$gray100" }} />
            <Box css={{ px: "$4" }}>
              <UserDropdownMenu user={session!.user!} displayName />
            </Box>
          </SideNavigation>
          <Box css={{ flexGrow: 1 }}>{children}</Box>
        </Flex>
      </FullBleedLayout>
      <BottomNavigation />
    </>
  );
};
