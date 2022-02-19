import { RadioGroupIndicator, RadioGroupItem, styled } from "ui";

export const EmojiRadio = styled(RadioGroupItem, {
  all: "unset",
  position: "relative",
  display: "grid",
  placeItems: "center",
  background: "transparent",
  border: "none",
  borderRadius: "$large",
  width: "48px",
  height: "48px",

  "&:hover": { border: "2px solid $pink600" },
  // "&:focus": { boxShadow: `0 0 0 2px black` },
});

export const EmojiIndicator = styled(RadioGroupIndicator, {
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(62deg, #f37286 0%, #ef81ae 16%, #ec90cc 33%, #ea9ee2 50%, #d6b5e8 66%, #d0c5e8 83%, #d2d2e9 100%)",
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
