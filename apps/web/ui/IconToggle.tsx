import { styled, Toggle } from "ui";

export const IconToggle = styled(Toggle, {
  all: "unset",
  p: "$1",
  backgroundColor: "$blackDamp",
  borderRadius: "$large",
  size: 35,
  display: "inline-flex",
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",

  "& svg": { stroke: "$paragraph" },
  "&:hover": { backgroundColor: "$background" },

  '&[data-state="on"]': {
    backgroundColor: "$primary",
    "& svg": { stroke: "$background" },
  },

  "&:focus": {
    outline: "2px solid $primary",
    outlineOffset: 2,
  },
});
