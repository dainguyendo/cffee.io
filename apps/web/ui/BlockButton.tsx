import { useSlate } from "slate-react";
import { Format } from "../types/slate";
import { toggleBlock } from "../utils/editor";
import { IconToggle } from "./IconToggle";

export const BlockButton: React.FC<{
  format: Format;
  label: string;
}> = ({ children, format, label }) => {
  const editor = useSlate();
  return (
    <IconToggle
      aria-label={label}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {children}
    </IconToggle>
  );
};
