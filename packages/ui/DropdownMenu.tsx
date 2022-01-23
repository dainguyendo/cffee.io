import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled } from "./stitches.config";

export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export const DropdownMenuContent = styled(RadixDropdownMenu.Content, {
  background: "white",
  minWidth: "20ch",
  borderRadius: "$large",
  padding: "$3 $2",
});

export const DropdownMenuItem = styled(RadixDropdownMenu.Item, {
  padding: "$2",
  borderRadius: "$medium",
  outline: "none",

  "&:hover": {
    backgroundColor: "$purple100",
  },
});

export const DropdownMenuCheckboxItem = RadixDropdownMenu.CheckboxItem;
export const DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup;
export const DropdownMenuRadioItem = RadixDropdownMenu.RadioItem;
export const DropdownMenuItemIndicator = RadixDropdownMenu.ItemIndicator;
export const DropdownMenuTriggerItem = RadixDropdownMenu.TriggerItem;
export const DropdownMenuLabel = RadixDropdownMenu.Label;
export const DropdownMenuSeparator = RadixDropdownMenu.Separator;
export const DropdownMenuArrow = RadixDropdownMenu.Arrow;
