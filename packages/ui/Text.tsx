import { styled } from "./stitches.config";

export const Text = styled("span", {
  fontFamily: "$inter",

  variants: {
    variant: {
      heading: {
        fontWeight: "$bold",
        color: "$heading",
      },
      paragraph: {
        color: "$paragraph",
      },
      caption: {
        color: "$caption",
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
