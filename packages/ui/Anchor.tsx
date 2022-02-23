import { styled } from "./stitches.config";

export const Anchor = styled("a", {
  variants: {
    variant: {
      default: {
        color: "$primary",
        textDecoration: "underline",
        textDecorationThickness: "2px",
        textUnderlineOffset: "2px",

        "&:hover": {
          textDecoration: "none",
        },
      },
      primaryButton: {
        all: "unset",
        border: "none",
        borderRadius: "$medium",
        px: "$3",
        py: "$2",
        backgroundColor: "$primary",
        color: "$stroke",
        fontWeight: "$bold",
        "&:focus": {
          outlineOffset: 2,
          outline: "1px solid $primary",
        },
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});
