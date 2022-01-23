import BoringAvatar from "boring-avatars";
import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { User } from "react-feather";
import {
  Anchor,
  Avatar,
  AvatarFallback,
  AvatarImage,
  ButtonLink,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  Spacer,
  styled,
  Text,
  theme,
} from "ui";

const MenuLabelRow = styled(DropdownMenuLabel, {
  display: "flex",
  alignItems: "center",
});

interface Props {
  user: DefaultSession["user"];
}

export const UserDropdownMenu = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar size="medium">
          <AvatarImage src={user?.image} alt={user.name ?? "User"} />
          <AvatarFallback>
            <BoringAvatar
              name={user.name}
              variant="marble"
              colors={[
                theme.colors.primary.value,
                theme.colors.secondary.value,
              ]}
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={4}>
        <MenuLabelRow>
          <User size={18} color={theme.colors.gray400.value} />
          <Spacer direction="horizontal" size="1" />
          <Text as="h1" css={{ fontSize: "$1", color: "$gray400" }}>
            Profile settings
          </Text>
        </MenuLabelRow>
        <DropdownMenuItem>
          <Link href="/profile" passHref>
            <Anchor>View profile</Anchor>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator asChild>
          <Separator css={{ backgroundColor: "$gray200", my: "$2" }} />
        </DropdownMenuSeparator>
        <DropdownMenuItem>
          <ButtonLink onClick={() => signOut()}>
            <Text css={{ fontSize: "$1", color: "$gray500" }}>Sign out</Text>
          </ButtonLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
