import { signIn, useSession } from "next-auth/react";
import { Box, Button, styled } from "ui";
import { UserDropdownMenu } from "./UserDropdownMenu";

const Nav = styled("nav", {
  minHeight: "60px",
  py: "$4",
  display: "flex",
});

export const LoadingNavigation = () => {
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
          <Button
            type="button"
            onClick={() => {
              signIn();
            }}
          >
            Sign in
          </Button>
        </div>
      </Nav>
    );
  }

  return <Nav></Nav>;
};
