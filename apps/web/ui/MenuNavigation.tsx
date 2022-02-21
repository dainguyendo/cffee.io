import { signOut } from "next-auth/react";
import Link from "next/link";
import { Menu } from "react-feather";
import {
  Anchor,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Separator,
  styled,
} from "ui";
import { FeedbackDialog } from "./FeedbackDialog";

export const MenuNavigation = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton type="button" aria-label="Customise options">
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
          <Separator css={{ my: "$1" }} />
        </DropdownMenuSeparator>

        <FeedbackDialog>
          <Button type="button" variant="secondary">
            Feedback
          </Button>
        </FeedbackDialog>

        <DropdownMenuSeparator asChild>
          <Separator css={{ my: "$1" }} />
        </DropdownMenuSeparator>

        <DropdownMenuItem>
          <Button type="button" variant="link" onClick={() => signOut()}>
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
