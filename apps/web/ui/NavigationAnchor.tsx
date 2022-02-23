import { styled } from "ui";

export const NavigationAnchor = styled("a", {
  background: "$secondary",
  borderRadius: "$medium",
  padding: "$2 $3",
  color: "$stroke",

  "& svg": {
    stroke: "$stroke",
  },

  display: "flex",
  gap: "$2",
  alignItems: "center",

  "&:focus": {
    outline: "2px solid $primary",
    outlineOffset: 2,
  },

  variants: {
    active: {
      true: {
        background: "$gradient",
      },
    },
  },
});
