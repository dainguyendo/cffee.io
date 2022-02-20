import { Editable as SlateEditable } from "slate-react";
import { styled } from "ui";

export const Editable = styled(SlateEditable, {
  borderRadius: "$medium",
  padding: "$4",
  color: "$paragraph",
  background: "$blackDamp",

  boxShadow: `
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.017),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.022),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.026),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.032),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.041),
    100px 100px 80px rgba(0, 0, 0, 0.07)
  `,
});
