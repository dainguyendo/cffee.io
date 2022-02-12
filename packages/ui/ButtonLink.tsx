import React, { ButtonHTMLAttributes } from "react";
import { linkCss } from "./Anchor";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonLink: React.FC<Props> = (props) => {
  return <button {...props} className={linkCss()} />;
};
