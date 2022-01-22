import type { PropertyValue } from "@stitches/react";
import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  getCssText,
  config,
} = createStitches({
  theme: {
    colors: {
      purple100: "hsla(240, 35%, 87%, 1)",
      purple200: "hsla(240, 35%, 75%, 1)",
      purple300: "hsla(240, 50%, 68%, 1)",
      purple400: "hsla(240, 60%, 65%, 1)",
      purple500: "hsla(250, 65%, 60%, 1)",
      purple600: "hsla(250, 80%, 60%, 1)",
      pink100: "hsla(338, 24%, 91%, 1)",
      pink200: "hsla(340, 33%, 88%, 1)",
      pink300: "hsla(345, 52%, 86%, 1)",
      pink400: "hsla(348, 74%, 84%, 1)",
      pink500: "hsla(351, 81%, 82%, 1)",
      pink600: "hsla(351, 84%, 70%, 1)",
      gray100: "hsla(0, 0%, 93%, 1)",
      gray200: "hsla(0, 0%, 80%, 1)",
      gray300: "hsla(0, 0%, 60%, 1)",
      gray400: "hsla(0, 0%, 40%, 1)",
      gray500: "hsla(0, 0%, 20%, 1)",
      gray600: "hsla(0, 0%, 0%, 1)",

      primary: "$purple600",
      secondary: "$pink600",
    },
    fonts: {
      inter: '"Inter", sans-serif',
    },
    fontSizes: {
      1: ".875rem",
      2: "1rem",
      3: "1.125rem",
      4: "1.5rem",
      5: "2rem",
      6: "3rem",
      7: "4rem",
    },
    fontWeights: {
      thin: 200,
      normal: 400,
      semiBold: 500,
      bold: 600,
    },
    space: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "24px",
      6: "32px",
      7: "48px",
      8: "72px",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
    bp2: "(min-width: 900px)",
    bp3: "(min-width: 1200px)",
    bp4: "(min-width: 1800px)",
    motion: "(prefers-reduced-motion)",
    hover: "(any-hover: hover)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
  utils: {
    hs: (value: PropertyValue<"marginLeft">) => ({
      display: "flex",
      flexDirection: "row",
      "& > * + *": {
        marginLeft: value,
      },
    }),
    vs: (value: PropertyValue<"marginLeft">) => ({
      display: "flex",
      flexDirection: "column",
      "& > * + *": {
        marginTop: value,
      },
    }),
    p: (value: PropertyValue<"padding">) => ({
      padding: value,
    }),
    pt: (value: PropertyValue<"paddingTop">) => ({
      paddingTop: value,
    }),
    pr: (value: PropertyValue<"paddingRight">) => ({
      paddingRight: value,
    }),
    pb: (value: PropertyValue<"paddingBottom">) => ({
      paddingBottom: value,
    }),
    pl: (value: PropertyValue<"paddingLeft">) => ({
      paddingLeft: value,
    }),
    px: (value: PropertyValue<"paddingLeft">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: PropertyValue<"paddingTop">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: PropertyValue<"margin">) => ({
      margin: value,
    }),
    mt: (value: PropertyValue<"marginTop">) => ({
      marginTop: value,
    }),
    mr: (value: PropertyValue<"marginRight">) => ({
      marginRight: value,
    }),
    mb: (value: PropertyValue<"marginBottom">) => ({
      marginBottom: value,
    }),
    ml: (value: PropertyValue<"marginLeft">) => ({
      marginLeft: value,
    }),
    mx: (value: PropertyValue<"marginLeft">) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: PropertyValue<"marginTop">) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value: PropertyValue<"textAlign">) => ({ textAlign: value }),

    fd: (value: PropertyValue<"flexDirection">) => ({ flexDirection: value }),
    fw: (value: PropertyValue<"flexWrap">) => ({ flexWrap: value }),

    ai: (value: PropertyValue<"alignItems">) => ({ alignItems: value }),
    ac: (value: PropertyValue<"alignContent">) => ({ alignContent: value }),
    jc: (value: PropertyValue<"justifyContent">) => ({ justifyContent: value }),
    as: (value: PropertyValue<"alignSelf">) => ({ alignSelf: value }),
    fg: (value: PropertyValue<"flexGrow">) => ({ flexGrow: value }),
    fs: (value: PropertyValue<"flexShrink">) => ({ flexShrink: value }),
    fb: (value: PropertyValue<"flexBasis">) => ({ flexBasis: value }),

    bc: (value: PropertyValue<"backgroundColor">) => ({
      backgroundColor: value,
    }),

    br: (value: PropertyValue<"borderRadius">) => ({
      borderRadius: value,
    }),
    btrr: (value: PropertyValue<"borderTopRightRadius">) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: PropertyValue<"borderBottomRightRadius">) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: PropertyValue<"borderBottomLeftRadius">) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: PropertyValue<"borderTopLeftRadius">) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value: PropertyValue<"boxShadow">) => ({ boxShadow: value }),

    lh: (value: PropertyValue<"lineHeight">) => ({ lineHeight: value }),

    ox: (value: PropertyValue<"overflowX">) => ({ overflowX: value }),
    oy: (value: PropertyValue<"overflowY">) => ({ overflowY: value }),

    pe: (value: PropertyValue<"pointerEvents">) => ({ pointerEvents: value }),
    us: (value: PropertyValue<"userSelect">) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    userSelect: (value: PropertyValue<"userSelect">) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value: PropertyValue<"width">) => ({
      width: value,
      height: value,
    }),

    appearance: (value: PropertyValue<"appearance">) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: PropertyValue<"backgroundClip">) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});
