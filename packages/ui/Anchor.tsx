import { HTMLProps } from "react";
import { css } from "./stitches.config";

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

export const Anchor = (props: HTMLProps<HTMLAnchorElement>) => {
  return <a className={linkCss()} {...props}></a>;
};
