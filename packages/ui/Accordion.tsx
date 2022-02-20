import * as RadixAccordion from "@radix-ui/react-accordion";
import React from "react";
import { ChevronDown } from "react-feather";
import { keyframes, styled } from "./stitches.config";

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

const StyledAccordion = styled(RadixAccordion.Root, {
  border: "1px solid transparent",
  borderRadius: "$medium",
  boxShadow: `
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.017),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.022),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.026),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.032),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.041),
    100px 100px 80px rgba(0, 0, 0, 0.07)
  `,
});

const StyledItem = styled(RadixAccordion.Item, {
  overflow: "hidden",
  marginTop: 1,

  "&:first-child": {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  "&:last-child": {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  "&:focus-within": {
    position: "relative",
    zIndex: 1,
  },
});

const StyledHeader = styled(RadixAccordion.Header, {
  all: "unset",
  display: "flex",
});

const StyledTrigger = styled(RadixAccordion.Trigger, {
  all: "unset",
  px: "$3",
  py: 0,
  flex: 1,
  height: 45,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "inherit",
  '&[data-state="closed"]': { backgroundColor: "inherit" },
  '&[data-state="open"]': { backgroundColor: "inherit" },
  "&:hover": { backgroundColor: "$blackDamp" },
});

const StyledContent = styled(RadixAccordion.Content, {
  overflow: "hidden",
  backgroundColor: "$blackDamp",
  p: "$4",

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const StyledChevron = styled(ChevronDown, {
  color: "$primary",
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  "[data-state=open] &": { transform: "rotate(180deg)" },
});

export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, any>(
  ({ children, ...props }, forwardedRef) => (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <StyledChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
  )
);
export const AccordionContent = React.forwardRef<HTMLDivElement, any>(
  ({ children, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      {children}
    </StyledContent>
  )
);
