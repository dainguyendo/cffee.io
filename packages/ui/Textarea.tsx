import { styled } from "./stitches.config";

export const Textarea = styled("textarea", {
  all: "unset",
  background: "$blackDamp",
  border: "1px solid transparent",
  borderRadius: "$medium",
  padding: "$2",
  color: "$stroke",

  "&:hover": { border: "1px solid $primary" },
  "&:focus": { border: "1px solid $primary" },

  '&[aria-invalid="true"]': {
    color: "red",
    border: "1px solid red",
  },
  variants: {
    resize: {
      none: {
        resize: "none",
      },
      horizontal: {
        resize: "horizontal",
      },
      veritical: {
        resize: "vertical",
      },
      both: {
        resize: "both",
      },
    },
  },
  defaultVariants: {
    resize: "none",
  },
});
