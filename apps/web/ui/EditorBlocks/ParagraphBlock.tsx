import { styled } from "ui";

const Paragraph = styled("p", {
  p: "$1",
  borderRadius: "$small",
  transition: "background .35s",
  width: "fit-content",

  "&:hover": { background: "hsla(210, 87.7%, 16.0%, 0.028)" },
  "&:focus": { background: "hsla(210, 87.7%, 16.0%, 0.028)" },
});

interface Props {
  attributes?: Record<string, any>;
}

export const ParagraphBlock: React.FC<Props> = ({ attributes, children }) => {
  return <Paragraph {...attributes}>{children}</Paragraph>;
};
