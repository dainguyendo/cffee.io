import { signOut } from "next-auth/react";
import Link from "next/link";
import { Menu } from "react-feather";
import {
  Anchor,
  Button,
  ButtonLink,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  styled,
} from "ui";
import { FeedbackDialog } from "./FeedbackDialog";

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

export const MenuNavigation = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="Customise options">
          <Menu />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="left" sideOffset={4}>
        <DropdownMenuItem>
          <Link href="/brew" passHref>
            <Anchor>New brew</Anchor>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/home" passHref>
            <Anchor>Journal</Anchor>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/equipment" passHref>
            <Anchor>Equipment</Anchor>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/timer" passHref>
            <Anchor>Timer</Anchor>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator asChild>
          <Separator css={{ backgroundColor: "$gray200", my: "$2" }} />
        </DropdownMenuSeparator>

        <FeedbackDialog>
          <Button variant="outline">Feedback</Button>
        </FeedbackDialog>

        <DropdownMenuSeparator asChild>
          <Separator css={{ backgroundColor: "$gray200", my: "$2" }} />
        </DropdownMenuSeparator>

        <DropdownMenuItem>
          <ButtonLink onClick={() => signOut()}>Sign out</ButtonLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
