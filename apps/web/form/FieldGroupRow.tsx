import { Flex, styled } from "ui";

export const FieldGroupRow = styled(Flex, {
  flexWrap: "wrap",
  gap: "$4",
  "& > *": {
    flex: "1 1 200px",
  },
});
