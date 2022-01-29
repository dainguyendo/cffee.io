import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { keyframes, styled } from "./stitches.config";

const open = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-collapsible-content-height)" },
});

const close = keyframes({
  from: { height: "var(--radix-collapsible-content-height)" },
  to: { height: 0 },
});

export const Collapsible = RadixCollapsible.Root;
export const CollapsibleTrigger = RadixCollapsible.Trigger;
export const CollapsibleContent = styled(RadixCollapsible.Content, {
  overflow: "hidden",
  '&[data-state="open"]': { animation: `${open} 300ms ease-out` },
  '&[data-state="closed"]': { animation: `${close} 300ms ease-out` },
});
