interface PlainText {
  text: string;
}

interface BoldText extends PlainText {
  bold: true;
}

interface ItalicText extends PlainText {
  italic: true;
}

interface CodeText extends PlainText {
  code: true;
}

interface ParagraphElement {
  type: "paragraph";
  children: CustomText[];
}

interface BlockQuoteElement {
  type: "block-quote";
  children: CustomText[];
}

interface ListElement {
  type: "bulleted-list";
  children: ListItemElement[];
}

interface ListItemElement {
  type: "list-item";
  children: CustomText[];
}

export type Format =
  | "bold"
  | "italic"
  | "underline"
  | "code"
  | "bulleted-list"
  | "numbered-list";
export type CustomElement = ParagraphElement | BlockQuoteElement | ListElement;
export type CustomText = PlainText | BoldText | ItalicText | CodeText;
