import { styled, theme } from "./stitches.config";

const Base = styled("div", {
  display: "block",

  variants: {
    direction: {
      vertical: {},
      horizontal: {},
    },
  },
});

interface Props {
  direction?: React.ComponentProps<typeof Base>["direction"];
  size: keyof typeof theme.space;
}

export const Spacer = ({ direction = "vertical", size = "1" }: Props) => {
  return (
    <Base
      direction={direction}
      css={
        direction === "vertical"
          ? {
              width: "1px",
              minWidth: "1px",
              height: theme.space[size].value,
              minHeight: theme.space[size].value,
            }
          : {
              height: "1px",
              minHeight: "1px",
              width: theme.space[size].value,
              minWidth: theme.space[size].value,
            }
      }
    />
  );
};
