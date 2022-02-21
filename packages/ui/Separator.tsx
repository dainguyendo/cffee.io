import * as RadixSeparator from "@radix-ui/react-separator";
import { styled } from "./stitches.config";

export const Separator = styled(RadixSeparator.Root, {
  "&[data-orientation=horizontal]": { height: 2, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 2 },
});
