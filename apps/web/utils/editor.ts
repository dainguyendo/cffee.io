import { Descendant, Editor, Element as SlateElement, Transforms } from "slate";
import { CustomElement, Format } from "../types/slate";
import { msToDuration } from "./copy";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const INITIAL_EDITOR_CONTENT: CustomElement[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

export const isMarkActive = (editor: Editor, format: Format) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false;
};

const isBlockActive = (editor: Editor, format: Format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n.type as any) === format,
    })
  );

  return !!match;
};

export const toggleMark = (editor: Editor, format: Format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const toggleBlock = (editor: Editor, format: Format) => {
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
    type: (isActive ? "paragraph" : isList ? "list-item" : format) as any,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block as any);
  }
};

export function toTimerBlocks(data: {
  time: number;
  laps: number[];
}): Descendant[] {
  const blocks: Descendant[] = [];

  const totalDuration = msToDuration(data.time);
  blocks.push({
    type: "paragraph",
    children: [{ text: `Total brew time: ${totalDuration}` }],
  });

  if (data.laps.length) {
    const listBlock: any = { type: "bulleted-list", children: [] };

    data.laps.forEach((lap, idx) => {
      const listItem = { type: "list-item", children: [] };
      let lapText = `Phase ${idx} at ${msToDuration(lap)}`;

      if (idx !== 0) {
        lapText += `, ${msToDuration(lap - data.laps[idx - 1])} from Phase ${
          idx - 1
        }`;
      }

      (listItem.children as any).push({ text: lapText });
      listBlock.children.push(listItem);
    });

    blocks.push(listBlock);
  }

  return blocks;
}
