import { styled } from "ui";
import { ZedStack } from "./ZedStack";

export const RadioZedStack = styled(ZedStack, {
  width: 50,
  height: 50,
  borderRadius: "$medium",
  p: "$2",

  "&:hover": {
    backgroundColor: "$gray100",
    transform: "scale(1.2)",
  },

  variants: {
    selected: {
      true: {
        backgroundColor: "$purple100",
      },
    },
  },
});
