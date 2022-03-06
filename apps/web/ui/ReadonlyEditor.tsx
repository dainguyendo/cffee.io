import React from "react";
import { createEditor, Descendant } from "slate";
import { Editable as SlateEditable, Slate, withReact } from "slate-react";
import { styled } from "ui";
import { Element } from "./EditorBlocks/Element";
import { Leaf } from "./EditorBlocks/Leaf";

interface Props {
  value: Descendant[];
}

const Readonly = styled(SlateEditable, {
  borderRadius: "$medium",
});

export const ReadonlyEditor = ({ value }: Props) => {
  const renderElement = React.useCallback(
    (props) => <Element {...props} />,
    []
  );
  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);
  const editor = React.useMemo(() => withReact(createEditor()), []);
  return (
    <Slate editor={editor} value={value} onChange={() => {}}>
      <Readonly
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck={false}
      />
    </Slate>
  );
};
