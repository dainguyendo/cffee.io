import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Tool, Watch } from "react-feather";
import { Anchor, Box, Button, List, Separator, styled, Text } from "ui";
import { UserDropdownMenu } from "../ui/UserDropdownMenu";
import { getFirstName } from "../utils/user";
import { SimpleSidebarLayout } from "./SimpleSidebarLayout";

const Greeting = styled(Text, {
  fontSize: "$4",
});

const Title = styled(Text, {
  fontWeight: "$bold",
  fontSize: "$3",
});

const Description = styled(Text, {
  fontSize: "$1",
  color: "$gray400",
  fontWeight: "$semiBold",
});

const ListItem = styled("li", {
  display: "flex",
  gap: "$2",
  alignItems: "center",
});

const ListItemContent = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const Page: React.FC = ({ children }) => {
  const { data: session } = useSession();

  const name = session?.user?.name;

  return (
    <SimpleSidebarLayout>
      <Box css={{ p: "$4" }}>
        <nav>
          {name ? (
            <Greeting>☕ for {getFirstName(name)}?</Greeting>
          ) : (
            <Greeting>☕ Welcome ☕</Greeting>
          )}
          <Separator css={{ my: "$4", backgroundColor: "$gray100" }} />

          <Link href="/brew" passHref>
            <Anchor>New brew</Anchor>
          </Link>

          <Separator decorative css={{ my: "$2" }} />

          <List css={{ gap: "$2" }}>
            <ListItem>
              <Link href="/home">
                <a>
                  <BookOpen size={32} />
                  <ListItemContent>
                    <Title>Journal</Title>
                    <Description>Overview of your sweet brews.</Description>
                  </ListItemContent>
                </a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/equipment">
                <a>
                  <Tool size={32} />
                  <ListItemContent>
                    <Title>Equipment</Title>
                    <Description>
                      Make changes to regular set up. Jot future entries with
                      ease.
                    </Description>
                  </ListItemContent>
                </a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/timer">
                <a>
                  <Watch size={32} />
                  <ListItemContent>
                    <Title>Timer</Title>
                    <Description>
                      Brewing in real time? No problem, log straight away.
                    </Description>
                  </ListItemContent>
                </a>
              </Link>
            </ListItem>
          </List>
          <Separator css={{ my: "$4", backgroundColor: "$gray100" }} />
          <UserDropdownMenu user={session!.user!} />
        </nav>
      </Box>
      <div>{children}</div>
    </SimpleSidebarLayout>
  );
};
