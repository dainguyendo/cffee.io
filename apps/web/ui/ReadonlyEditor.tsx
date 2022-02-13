import React, { useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Editable as SlateEditable, Slate, withReact } from "slate-react";
import { styled } from "ui";

interface Props {
  value: Descendant[];
}

const Readonly = styled(SlateEditable, {
  borderRadius: "$medium",
});

export const ReadonlyEditor = ({ value }: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate editor={editor} value={value} onChange={() => {}}>
      <Readonly readOnly />
    </Slate>
  );
};
