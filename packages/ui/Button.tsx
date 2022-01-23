import { styled } from "./stitches.config";

export const Button = styled(
  "button",
  {
    borderRadius: "$medium",
    border: "solid 1px transparent",
    fontWeight: "$semiBold",

    variants: {
      variant: {
        primary: {
          backgroundColor: "$primary",
          color: "white",
        },
        secondary: {
          backgroundColor: "$secondary",
          color: "white",
        },
        outline: {
          backgroundColor: "white",
          color: "$primary",
          border: "2px solid currentColor",
        },
      },
      size: {
        small: {
          padding: "$2 $4",
          fontSize: "$2",
        },
        medium: {
          padding: "$3 $6",
          fontSize: "$3",
        },
        large: {
          padding: "$4 $8",
          fontSize: "$4",
        },
      },
    },
  },
  {
    defaultVariants: {
      variant: "primary",
      size: "small",
    },
  }
);
