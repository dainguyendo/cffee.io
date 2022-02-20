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
      primary: {
        background: "$secondary",
        color: "$primary",
      },
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});
