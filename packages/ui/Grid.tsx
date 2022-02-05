import { styled } from "./stitches.config";

export const Grid = styled("div", {
  display: "grid",
  variants: {
    inline: {
      true: {
        display: "inline-grid",
      },
    },
  },
  defaultVariants: {
    inline: false,
  },
});
