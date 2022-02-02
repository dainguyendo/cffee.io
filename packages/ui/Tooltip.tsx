import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "./stitches.config";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = styled(TooltipPrimitive.Root);
export const TooltipTrigger = styled(TooltipPrimitive.Trigger);
export const TooltipContent = styled(TooltipPrimitive.Content);
export const TooltipArrow = styled(TooltipPrimitive.Arrow);
