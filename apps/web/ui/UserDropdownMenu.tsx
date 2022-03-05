import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  Anchor,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  Separator,
} from "ui";
import { getFirstName } from "../utils/user";
import { FeedbackDialog } from "./FeedbackDialog";
import { UserAvatar } from "./UserAvatar";

interface Props {
  user: DefaultSession["user"];
  displayName?: boolean;
  align: React.ComponentProps<typeof DropdownMenuContent>["align"];
  side: React.ComponentProps<typeof DropdownMenuContent>["side"];
}

export const UserDropdownMenu = ({
  user,
  displayName = false,
  align,
  side,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Flex css={{ alignItems: "center", gap: "$2" }}>
          <div>
            <UserAvatar size="small" />
          </div>
          {displayName && getFirstName(user?.name ?? "")}
        </Flex>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="left" sideOffset={4}>
        <DropdownMenuItem>
          <Link href="/brew" passHref>
            <Anchor>New brew</Anchor>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator asChild>
          <Separator css={{ my: "$1" }} />
        </DropdownMenuSeparator>

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
          <Button type="button" variant="secondary" css={{ width: "100%" }}>
            Feedback
          </Button>
        </FeedbackDialog>

        <DropdownMenuSeparator asChild>
          <Separator css={{ my: "$2" }} />
        </DropdownMenuSeparator>

        {/* <Flex css={{ alignItems: "center", gap: "$2" }}>
          <div>
            <UserAvatar size="xsmall" />
          </div>
          {getFirstName(session?.user?.name ?? "")}
        </Flex> */}

        <DropdownMenuItem>
          <Link href="/profile" passHref>
            <Anchor>Profile</Anchor>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button type="button" variant="link" onClick={() => signOut()}>
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
