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

      <DropdownMenuContent sideOffset={4} side={side} align={align}>
        <DropdownMenuItem>
          <Link href="/profile" passHref>
            <Anchor>View profile</Anchor>
          </Link>
        </DropdownMenuItem>
        <FeedbackDialog>
          <Button type="button" variant="secondary">
            Feedback
          </Button>
        </FeedbackDialog>
        <DropdownMenuSeparator asChild>
          <Separator css={{ my: "$2" }} />
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
