import { styled } from "./stitches.config";

export const Box = styled("div", {
  variants: {
    gradiant: {
      true: {
        background:
          "linear-gradient(62deg, #f37286 0%, #ef81ae 16%, #ec90cc 33%, #ea9ee2 50%, #d6b5e8 66%, #d0c5e8 83%, #d2d2e9 100%)",
      },
    },
    boxShadow: {
      small: {
        boxShadow: `
          4.1px 7px 10px rgba(0, 0, 0, 0.035),
          33px 56px 80px rgba(0, 0, 0, 0.07)
        `,
      },
      medium: {
        boxShadow: `
          1.8px 1.4px 2.7px rgba(0, 0, 0, 0.018),
          4.4px 3.5px 6.9px rgba(0, 0, 0, 0.024),
          9px 7.1px 14.2px rgba(0, 0, 0, 0.029),
          18.6px 14.6px 29.2px rgba(0, 0, 0, 0.039),
          51px 40px 80px rgba(0, 0, 0, 0.07)
        `,
      },
      large: {
        boxShadow: `
          2.8px 2.8px 2.2px rgba(0, 0, 0, 0.017),
          6.7px 6.7px 5.3px rgba(0, 0, 0, 0.022),
          12.5px 12.5px 10px rgba(0, 0, 0, 0.026),
          22.3px 22.3px 17.9px rgba(0, 0, 0, 0.032),
          41.8px 41.8px 33.4px rgba(0, 0, 0, 0.041),
          100px 100px 80px rgba(0, 0, 0, 0.07)
        `,
      },
    },
  },

  defaultVariants: {
    gradiant: false,
    boxShadow: undefined,
  },
});
