import { styled } from "./stitches.config";

export const Flex = styled("div", {
  display: "flex",
  variants: {
    inline: {
      true: {
        display: "inline-flex",
      },
    },
  },
  defaultVariants: {
    inline: false,
  },
});
