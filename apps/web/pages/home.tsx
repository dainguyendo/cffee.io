import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { BookOpen, Tool, Watch } from "react-feather";
import { Button, List, Separator, styled, Text } from "ui";
import { SidebarLayout } from "../ui/SidebarLayout";
import { UserDropdownMenu } from "../ui/UserDropdownMenu";
import { getFirstName } from "../utils/user";

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

export default function Home() {
  const { data: session, status } = useSession();

  const name = session?.user?.name;

  return (
    <>
      <SidebarLayout
        contentMin="60%"
        noStretch={false}
        side="left"
        sideWidth="12rem"
        space="1"
        wrapReverse={false}
      >
        <div>
          <nav>
            {name ? (
              <Greeting>☕ for {getFirstName(name)}?</Greeting>
            ) : (
              <Greeting>☕ Welcome ☕</Greeting>
            )}
            <Separator css={{ my: "$4", backgroundColor: "$gray100" }} />

            <Button size="medium">New brew</Button>

            <Separator decorative css={{ my: "$2" }} />

            <List css={{ gap: "$2" }}>
              <ListItem>
                <BookOpen size={32} />
                <ListItemContent>
                  <Title>Journal</Title>
                  <Description>Overview of your sweet brews.</Description>
                </ListItemContent>
              </ListItem>
              <ListItem>
                <Tool size={32} />
                <ListItemContent>
                  <Title>Equipment</Title>
                  <Description>
                    Make changes to regular set up. Jot future entries with
                    ease.
                  </Description>
                </ListItemContent>
              </ListItem>
              <ListItem>
                <Watch size={32} />
                <ListItemContent>
                  <Title>Timer</Title>
                  <Description>
                    Brewing in real time? No problem, log straight away.
                  </Description>
                </ListItemContent>
              </ListItem>
            </List>
            <Separator css={{ my: "$4", backgroundColor: "$gray100" }} />
            <UserDropdownMenu user={session!.user!} />
          </nav>
          <div>lkdfsldkjf</div>
        </div>
      </SidebarLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: await getSession(context),
    },
  };
};
