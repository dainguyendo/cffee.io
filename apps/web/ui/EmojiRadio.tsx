import { RadioGroupIndicator, RadioGroupItem, styled } from "ui";

export const EmojiRadio = styled(RadioGroupItem, {
  all: "unset",
  position: "relative",
  display: "grid",
  placeItems: "center",
  background: "transparent",
  border: "2px solid transparent",
  borderRadius: "$large",
  width: "48px",
  height: "48px",

  "&:hover": { border: "2px solid $primary" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

export const EmojiIndicator = styled(RadioGroupIndicator, {
  display: "grid",
  placeItems: "center",
  background: "$gradient",
  border: "none",
  borderRadius: "$large",
  width: "48px",
  height: "48px",

  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export const EmojiBox = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  placeItems: "center",

  "& > *": {
    gridColumn: 1,
  },
});
