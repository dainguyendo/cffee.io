import { useSlate } from "slate-react";
import { styled, Toggle } from "ui";
import { Format } from "../types/slate";
import { toggleMark } from "../utils/editor";

const StyledToggle = styled(Toggle, {
  p: "$1",
  backgroundColor: "white",
  border: "none",
  borderRadius: "$large",
  size: 35,
  display: "inline-flex",
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: "$gray100",
  },

  '&[data-state="on"]': {
    backgroundColor: "$purple100",
  },

  "&:focus": { boxShadow: `0 0 0 1px $gray200` },
});

export const MarkButton: React.FC<{ format: Format; label: string }> = ({
  label,
  format,
  children,
}) => {
  const editor = useSlate();
  return (
    <StyledToggle
      aria-label={label}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children}
    </StyledToggle>
  );
};
