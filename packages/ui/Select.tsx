import { styled } from "./stitches.config";

export const Select = styled("select", {
  all: "unset",
  background: "$blackDamp",
  border: "1px solid $secondary",
  borderRadius: "$medium",
  padding: "$2",
  color: "$paragraph",

  "&:hover": { border: "1px solid $primary" },
  "&:focus": { border: "1px solid $primary" },

  '&[aria-invalid="true"]': {
    color: "red",
    border: "1px solid red",
  },
});
