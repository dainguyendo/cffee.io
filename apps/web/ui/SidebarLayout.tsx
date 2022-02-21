import { styled, theme } from "ui";

export const SidebarLayout = styled("div", {
  display: "flex",
  flexWrap: "wrap",

  gap: "$1",
  "@bp2": {
    gap: "$3",
  },
  bp3: {
    gap: "$5",
  },

  "& > :first-child": {
    flexBasis: 225,
    flexGrow: "1",
  },

  "& > :last-child": {
    flexBasis: 0,
    flexGrow: "999",
    minInlineSize: "50%",
  },
});
