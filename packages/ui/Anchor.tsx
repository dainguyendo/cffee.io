import React from "react";
import { css, styled } from "./stitches.config";

export const linkCss = css({
  color: "$primary",
  fontWeight: "$semiBold",
  textDecoration: "underline",
  textDecorationThickness: "4px",
  textUnderlineOffset: "2px",

  padding: 0,
  background: "inherit",
  border: "none",

  "&:hover": {
    textDecoration: "none",
  },
});

const StyledAnchor = styled("a");

export const Anchor = (props: React.ComponentProps<typeof StyledAnchor>) => {
  return <StyledAnchor className={linkCss()} {...props}></StyledAnchor>;
};
