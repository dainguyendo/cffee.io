import { Editable as SlateEditable } from "slate-react";
import { styled } from "ui";

export const Editable = styled(SlateEditable, {
  border: "1px solid $gray100",
  borderRadius: "$medium",
  padding: "$4",
});
