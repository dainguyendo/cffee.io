import { Label, styled } from "ui";

export const Field = styled("div", {
  display: "flex",

  variants: {
    variant: {
      row: {
        flexDirection: "row",
        alignItems: "center",

        [`& > ${Label}`]: {
          marginLeft: "0.5rem",
        },

        "* + .form_inline-error": {
          marginLeft: "0.5rem",
        },
      },
      column: {
        flexDirection: "column",

        [`& ${Label} + *`]: {
          marginTop: "0",
        },

        "* + .form_inline-error": {
          marginTop: "0.25rem",
        },
      },
    },
  },
  defaultVariants: {
    variant: "column",
  },
});
