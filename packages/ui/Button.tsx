import { styled } from "./stitches.config";

export const Button = styled(
  "button",
  {
    border: "none",
    borderRadius: "$medium",
    px: "$2",
    py: "$1",

    variants: {
      variant: {
        primary: {
          backgroundColor: "$primary",
          color: "$paragraph",

          "&:focus": {
            outlineOffset: 2,
            outline: "1px solid $primary",
          },
        },
        secondary: {
          backgroundColor: "hsl(230, 32%, 17%)",
          color: "$paragraph",

          "&:focus": {
            outlineOffset: 2,
            outline: "1px solid $primary",
          },
        },
        link: {
          all: "unset",
          padding: "unset",
          color: "$primary",
          textDecoration: "underline",
          textDecorationThickness: "2px",
          textUnderlineOffset: "2px",

          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
  },
  {
    defaultVariants: {
      variant: "primary",
    },
  }
);
