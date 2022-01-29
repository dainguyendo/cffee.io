import { styled } from "ui";

export const ZedStack = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  placeItems: "center",
  "& > *": {
    gridColumn: 1,
  },
});
