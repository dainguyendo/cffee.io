import { styled } from "./stitches.config";

export const IconButton = styled("button", {
  all: "unset",
  padding: "$2",
  border: "1px solid transparent",
  borderRadius: "$small",
  width: 24,
  height: 24,

  variants: {
    variant: {
      primary: {
        background: "$blackDamp",

        "&:hover": { border: "1px solid $primary" },
        "&:focus": { border: "1px solid $primary" },
        "&:disabled": {
          "& svg": { stroke: "$background" },
        },
      },
    },

    raised: {
      true: {
        boxShadow: `
          4.1px 7px 10px rgba(0, 0, 0, 0.035),
          33px 56px 80px rgba(0, 0, 0, 0.07)
        `,
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    raised: false,
  },
});
