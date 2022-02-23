import { styled } from "./stitches.config";

export const Text = styled("span", {
  fontFamily: "$inter",

  variants: {
    variant: {
      heading: {
        color: "$headline",
      },
      paragraph: {
        color: "$paragraph",
      },
      caption: {
        color: "$paragraph",
      },
    },

    bold: {
      true: {
        fontWeight: "$bold",
      },
    },
  },

  defaultVariants: {
    variant: "paragraph",
    bold: false,
  },
});
