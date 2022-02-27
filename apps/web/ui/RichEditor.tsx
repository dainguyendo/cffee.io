import isHotkey from "is-hotkey";
import React, { useCallback } from "react";
import { Bold, Code, Italic, List, Underline } from "react-feather";
import { createEditor, Descendant, Editor } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import { Flex, Separator, VerticalStack } from "ui";
import { Format } from "../types/slate";
import { toggleMark } from "../utils/editor";
import { BlockButton } from "./BlockButton";
import { Editable } from "./Editable";
import { ParagraphBlock } from "./EditorBlocks/ParagraphBlock";
import { MarkButton } from "./MarkButton";

const HOTKEYS: Record<string, Format> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

// const LIST_TYPES = ["numbered-list", "bulleted-list"];

interface Props {
  value: Descendant[];
  setValue: (v: Descendant[]) => void;
  placeholder?: string;
}

export const RichEditor = ({ placeholder, value, setValue }: Props) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editorRef = React.useRef<Editor>();
  if (!editorRef.current)
    editorRef.current = withHistory(withReact(createEditor()));
  const editor = editorRef.current;
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <VerticalStack size="$2">
        <Flex css={{ gap: "$1" }}>
          <MarkButton label="Toggle bold" format="bold">
            <Bold size={14} />
          </MarkButton>
          <MarkButton label="Toggle italic" format="italic">
            <Italic size={14} />
          </MarkButton>
          <MarkButton label="Toggle underline" format="underline">
            <Underline size={14} />
          </MarkButton>
          <Separator orientation="vertical" css={{ mx: "$2" }} />
          <MarkButton label="Toggle code" format="code">
            <Code size={14} />
          </MarkButton>
          <Separator orientation="vertical" css={{ mx: "$2" }} />
          {/* <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" /> */}
          {/* <BlockButton format="numbered-list">
          <List />
        </BlockButton> */}
          <BlockButton label="Toggle bullet list" format="bulleted-list">
            <List size={14} />
          </BlockButton>
        </Flex>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
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
      </VerticalStack>
    </Slate>
  );
};

const Element = ({ attributes, children, element }: any) => {
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
      return <ParagraphBlock {...attributes}>{children}</ParagraphBlock>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
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
