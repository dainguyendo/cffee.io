import { Flex, styled } from "ui";

export const FieldGroupRow = styled(Flex, {
  "& > * + *": {
    marginLeft: "$4",
  },
});
