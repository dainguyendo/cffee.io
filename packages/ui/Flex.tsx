import { styled } from "./stitches.config";

export const Flex = styled("div", {
  display: "flex",
  variants: {
    inline: {
      true: {
        display: "inline-flex",
      },
    },

    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
  },
  defaultVariants: {
    inline: false,
    direction: "row",
  },
});
