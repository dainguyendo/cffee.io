import React, { ButtonHTMLAttributes } from "react";
import { linkCss } from "./Anchor";
import { CSS } from "./stitches.config";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonLink: React.FC<Props> = (props) => {
  return <button {...props} className={linkCss()} />;
};
