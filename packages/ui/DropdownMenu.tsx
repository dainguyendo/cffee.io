import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled } from "./stitches.config";

export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export const DropdownMenuContent = styled(RadixDropdownMenu.Content, {
  background: "$background",
  minWidth: "20ch",
  borderRadius: "$large",
  padding: "$3 $2",
  boxShadow: `
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.017),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.022),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.026),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.032),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.041),
    100px 100px 80px rgba(0, 0, 0, 0.07)
  `,
});

export const DropdownMenuItem = styled(RadixDropdownMenu.Item, {
  padding: "$2",
  borderRadius: "$medium",
  outline: "none",
});

export const DropdownMenuCheckboxItem = RadixDropdownMenu.CheckboxItem;
export const DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup;
export const DropdownMenuRadioItem = RadixDropdownMenu.RadioItem;
export const DropdownMenuItemIndicator = RadixDropdownMenu.ItemIndicator;
export const DropdownMenuTriggerItem = RadixDropdownMenu.TriggerItem;
export const DropdownMenuLabel = RadixDropdownMenu.Label;
export const DropdownMenuSeparator = RadixDropdownMenu.Separator;
export const DropdownMenuArrow = RadixDropdownMenu.Arrow;
