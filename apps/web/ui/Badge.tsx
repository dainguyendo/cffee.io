import { styled } from "ui";

export const Badge = styled("div", {
  display: "inline-grid",
  placeItems: "center",
  borderRadius: "$medium",
  padding: "$1 $2",

  fontWeight: "$bold",
  fontSize: ".75rem",

  variants: {
    variant: {
      purple: {
        background: "$purple100",
        color: "$purple600",
      },
      pink: {
        background: "$pink100",
        color: "$pink600",
      },
      gray: {
        background: "$gray100",
        color: "$gray600",
      },
      ghost: {
        background: "inherit",
        color: "$gray500",
      },
    },
  },

  defaultVariants: {
    variant: "purple",
  },
});
