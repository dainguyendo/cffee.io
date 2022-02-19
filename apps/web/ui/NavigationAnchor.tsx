import { styled } from "ui";

export const NavigationAnchor = styled("a", {
  background: "hsl(230, 32%, 17%)",
  borderRadius: "$medium",
  padding: "$2 $3",
  color: "$paragraph",

  "& svg": {
    stroke: "$paragraph",
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
        background:
          "linear-gradient(62deg, #f37286 0%, #ef81ae 16%, #ec90cc 33%, #ea9ee2 50%, #d6b5e8 66%, #d0c5e8 83%, #d2d2e9 100%)",
      },
    },
  },
});
