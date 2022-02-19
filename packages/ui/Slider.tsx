import * as RadixSlider from "@radix-ui/react-slider";
import { styled } from "./stitches.config";

export const Slider = styled(RadixSlider.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  maxWidth: 300,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: 20,
    height: 100,
  },
});

export const SliderTrack = styled(RadixSlider.Track, {
  backgroundColor: "$gray100",
  position: "relative",
  flexGrow: 1,
  borderRadius: "$pill",

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

export const SliderThumb = styled(RadixSlider.Thumb, {
  all: "unset",
  display: "block",
  width: 20,
  height: 20,
  backgroundColor: "white",
  boxShadow: `0 2px 10px $gray200`,
  borderRadius: 10,
  "&:hover": { backgroundColor: "$lightpink" },
  "&:focus": { boxShadow: `0 0 0 5px $gray200` },
});

export const SliderRange = styled(RadixSlider.Range, {
  position: "absolute",
  backgroundColor: "$lightpink",
  borderRadius: "9999px",
  height: "100%",
});
