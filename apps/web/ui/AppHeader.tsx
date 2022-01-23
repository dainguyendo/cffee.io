import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Anchor, Button, List, styled } from "ui";
import { UserDropdownMenu } from "./UserDropdownMenu";

const Navigation = styled("nav", {
  minHeight: "60px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "$2",
  paddingBottom: "$2",
  backgroundPosition: "0 0",
});

const LoadingNavigation = styled(Navigation, {
  width: "100%",
  border: "solid .125rem $gray200",
  background: "$gray100",
  borderRadius: "$medium",
});

export const AppHeader = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingNavigation />;
  }

  if (status === "authenticated" && session?.user) {
    return (
      <Navigation>
        <List>
          <li>
            <Link href="/home" passHref>
              <Anchor>Home</Anchor>
            </Link>
          </li>
        </List>
        <UserDropdownMenu user={session.user} />
      </Navigation>
    );
  }

  return (
    <Navigation>
      <List>
        <li>
          <Link href="/about" passHref>
            <Anchor>About</Anchor>
          </Link>
        </li>
      </List>
      <Button onClick={() => signIn()}>Sign in</Button>
    </Navigation>
  );
};
