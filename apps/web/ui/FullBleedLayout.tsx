import { styled, css } from "ui";

export const FullBleedLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr min(120ch, 100%) 1fr",

  "& > .full-bleed": {
    width: "100%",
    gridColumn: "1 / 4",
  },

  "& > *": {
    gridColumn: 2,
  },

  bp1: {
    padding: 0,
  },
});

export const fullBleed = css({
  width: "100%",
  gridColumn: "1 / 4",
});
