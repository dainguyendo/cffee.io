import { styled } from "ui";

export const BoxShadow = styled("div", {
  variants: {
    elevation: {
      small: {},
      medium: {},
      large: {},
    },
    color: {
      gray: {},
      pink: {},
      purple: {},
    },
  },

  compoundVariants: [
    {
      elevation: "small",
      color: "gray",
      css: {
        boxShadow: "0.5px 1px 1px hsl(0deg 0% 50%) / 0.7)",
      },
    },
    {
      elevation: "small",
      color: "pink",
      css: {
        boxShadow: "0.5px 1px 1px $pink600 / 0.7)",
      },
    },
    {
      elevation: "small",
      color: "purple",
      css: {
        boxShadow: "0.5px 1px 1px $purple600 / 0.7)",
      },
    },

    {
      elevation: "medium",
      color: "gray",
      css: {
        boxShadow: `1px 2px 2px hsl(0deg 0% 50%) / 0.333), 2px 4px 4px hsl(0deg 0% 50%) / 0.333), 3px 6px 6px hsl(0deg 0% 50%) / 0.333)`,
      },
    },
    {
      elevation: "medium",
      color: "pink",
      css: {
        boxShadow: `1px 2px 2px hsl(351, 84%, 70%) / 0.333), 2px 4px 4px hsl(351, 84%, 70%) / 0.333), 3px 6px 6px hsl(351, 84%, 70%) / 0.333)`,
      },
    },
    {
      elevation: "medium",
      color: "purple",
      css: {
        boxShadow: `
        1px 2px 2px $purple600 / 0.333),
        2px 4px 4px $purple600 / 0.333),
        3px 6px 6px $purple600 / 0.333)
        `,
      },
    },
  ],
});
