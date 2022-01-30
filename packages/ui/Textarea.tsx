import { styled } from "./stitches.config";

export const Textarea = styled("textarea", {
  borderRadius: "$medium",
  border: "1px solid $gray100",
  padding: "$1",
  color: "$purple600",

  "&:hover": {
    border: "1px solid $purple200",
  },

  "&:focus": {
    outline: "none",
    border: "1px solid $purple400",
  },

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
