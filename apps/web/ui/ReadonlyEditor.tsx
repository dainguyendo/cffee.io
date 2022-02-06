import React, { useState, useMemo } from "react";
import { createEditor, Descendant, Element } from "slate";
import { Slate, withReact } from "slate-react";
import { Editable } from "./Editable";

interface Props {
  value: Descendant[];
}

export const ReadonlyEditor = ({ value }: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate editor={editor} value={value} onChange={() => {}}>
      <Editable readOnly />
    </Slate>
  );
};
