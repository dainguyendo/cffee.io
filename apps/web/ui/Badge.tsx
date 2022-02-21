import { styled } from "ui";

export const Badge = styled("div", {
  display: "inline-grid",
  placeItems: "center",
  borderRadius: "$medium",
  padding: "$1 $2",

  fontWeight: "$bold",
  fontSize: ".75rem",
  whiteSpace: "nowrap",
  width: "fit-content",

  variants: {
    variant: {
      primary: {
        background: "$background",
        color: "$paragraph",
      },
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});
