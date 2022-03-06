import { useSession } from "next-auth/react";
import Link from "next/link";
import { Anchor, Box, Button, styled } from "ui";
import { UserDropdownMenu } from "./UserDropdownMenu";

const Nav = styled("nav", {
  minHeight: 60,
  maxHeight: 100,
  py: "$8",
  display: "flex",
  ai: "center",
});

export const LandingNavigation = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Nav>
        <Box css={{ flexGrow: 1 }} />
        <UserDropdownMenu user={session?.user} align="start" side="left" />
      </Nav>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Nav>
        <Box css={{ flexGrow: 1 }} />
        <div>
          <Link href="/auth/signin" passHref>
            <Anchor>Sign in</Anchor>
          </Link>
        </div>
      </Nav>
    );
  }

  return <Nav></Nav>;
};
