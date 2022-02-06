import isHotkey from "is-hotkey";
import React, { useCallback } from "react";
import { Bold, Code, Italic, List, Underline } from "react-feather";
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import { Flex, Separator, styled } from "ui";
import { Format } from "../types/slate";
import { toggleMark } from "../utils/editor";
import { MarkButton } from "./MarkButton";
import { Editable } from "./Editable";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

interface Props {
  value: Descendant[];
  setValue: (v: Descendant[]) => void;
}

export const RichEditor = ({ value, setValue }: Props) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editorRef = React.useRef<Editor>();
  if (!editorRef.current)
    editorRef.current = withHistory(withReact(createEditor()));
  const editor = editorRef.current;
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Flex>
        <MarkButton label="Toggle bold" format="bold">
          <Bold size={14} />
        </MarkButton>
        <MarkButton label="Toggle italic" format="italic">
          <Italic size={14} />
        </MarkButton>
        <MarkButton label="Toggle underline" format="underline">
          <Underline size={14} />
        </MarkButton>
        <Separator
          orientation="vertical"
          css={{ mx: "$2", backgroundColor: "$gray200" }}
        />
        <MarkButton label="Toggle code" format="code">
          <Code size={14} />
        </MarkButton>
        <Separator
          orientation="vertical"
          css={{ mx: "$2", backgroundColor: "$gray200" }}
        />
        {/* <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" /> */}
        {/* <BlockButton format="numbered-list">
          <List />
        </BlockButton> */}
        <MarkButton label="Toggle bullet list" format="bulleted-list">
          <List size={14} />
        </MarkButton>
      </Flex>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Taste like magic ✨"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor: Editor, format: Format) => {
  console.log("toggleBlock", { format });

  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor: Editor, format: Format) => {
  console.log("isBlockActive", { format });
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

// const BlockButton: React.FC<{ format: Format }> = ({ format, children }) => {
//   const editor = useSlate();
//   return (
//     <Toggle
//       onMouseDown={(event) => {
//         event.preventDefault();
//         toggleBlock(editor, format);
//       }}
//     >
//       {children}
//     </Toggle>
//   );
// };
