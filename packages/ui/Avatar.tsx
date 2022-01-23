import * as RadixAvatar from "@radix-ui/react-avatar";
import { styled } from "./stitches.config";

const StyledAvatar = styled(RadixAvatar.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  borderRadius: "100%",
  variants: {
    size: {
      xsmall: {
        width: "2.4rem",
        height: "2.4rem",
      },
      small: {
        width: "3.2rem",
        height: "3.2rem",
      },
      medium: {
        width: "4rem",
        height: "4rem",
      },
      large: {
        width: "6rem",
        height: "6rem",
      },
    },
  },
});

const StyledImage = styled(RadixAvatar.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const StyledFallback = styled(RadixAvatar.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  // fontSize: "$3",
  // fontWeight: 700,
});

// Exports
export const Avatar = StyledAvatar;
export const AvatarImage = StyledImage;
export const AvatarFallback = StyledFallback;
