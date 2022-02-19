import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { styled } from "./stitches.config";

const SCROLLBAR_SIZE = 10;

export const ScrollArea = styled(RadixScrollArea.Root, {
  overflow: "hidden",
});

export const ScrollAreaViewport = styled(RadixScrollArea.Viewport, {
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

export const ScrollAreaScrollBar = styled(RadixScrollArea.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: 2,
  background: "$secondary",
  transition: "background 160ms ease-out",
  "&:hover": { background: "$purple200" },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: SCROLLBAR_SIZE,
  },
});

export const ScrollAreaThumb = styled(RadixScrollArea.Thumb, {
  flex: 1,
  background: "$primary",
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: 44,
    minHeight: 44,
  },
});

export const ScrollAreaCorner = styled(RadixScrollArea.Corner);
