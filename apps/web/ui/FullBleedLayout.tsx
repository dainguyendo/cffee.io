import { styled, css } from "ui";

export const FullBleedLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr min(105ch, 100%) 1fr",

  "& > .full-bleed": {
    width: "100%",
    gridColumn: "1 / 4",
  },

  "& > *": {
    gridColumn: 2,
  },
});

export const fullBleed = css({
  width: "100%",
  gridColumn: "1 / 4",
});
