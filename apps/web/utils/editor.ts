import { Editor } from "slate";
import { Format } from "../types/slate";

export const isMarkActive = (editor: Editor, format: Format) => {
  console.log("isMarkActive", { format });
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: Format) => {
  console.log("toggleMark", { format });
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
