import { useSlate } from "slate-react";
import { styled, Toggle } from "ui";
import { Format } from "../types/slate";
import { toggleMark } from "../utils/editor";
import { IconToggle } from "./IconToggle";

export const MarkButton: React.FC<{ format: Format; label: string }> = ({
  label,
  format,
  children,
}) => {
  const editor = useSlate();
  return (
    <IconToggle
      aria-label={label}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children}
    </IconToggle>
  );
};
