import { styled, Toggle } from "ui";

export const IconToggle = styled(Toggle, {
  p: "$1",
  backgroundColor: "white",
  border: "none",
  borderRadius: "$large",
  size: 35,
  display: "inline-flex",
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: "$gray100",
  },

  '&[data-state="on"]': {
    backgroundColor: "$purple100",
  },

  "&:focus": { boxShadow: `0 0 0 1px $gray200` },
});
