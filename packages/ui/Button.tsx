import { styled } from "./stitches.config";

export const Button = styled(
  "button",
  {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "$1",
    border: "none",
    borderRadius: "$medium",
    px: "$3",
    py: "$2",

    variants: {
      variant: {
        primary: {
          backgroundColor: "$primary",
          color: "$stroke",
          fontWeight: "$bold",

          "&:focus": {
            outlineOffset: 2,
            outline: "1px solid $primary",
          },
        },
        secondary: {
          backgroundColor: "$secondary",
          color: "$stroke",
          fontWeight: "$bold",

          "&:focus": {
            outlineOffset: 2,
            outline: "1px solid $primary",
          },
        },
        link: {
          all: "unset",
          padding: "unset",
          color: "$headline",
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
