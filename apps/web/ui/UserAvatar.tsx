import BoringAvatar from "boring-avatars";
import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage, theme } from "ui";

interface Props {
  size: React.ComponentProps<typeof Avatar>["size"];
}

export const UserAvatar = ({ size }: Props) => {
  const { data } = useSession();
  const user = data?.user;
  return (
    <Avatar size={size}>
      <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? "User"} />
      <AvatarFallback>
        <BoringAvatar
          name={user?.name ?? ""}
          variant="marble"
          colors={[theme.colors.primary.value, theme.colors.secondary.value]}
        />
      </AvatarFallback>
    </Avatar>
  );
};
