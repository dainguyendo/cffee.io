import React from "react";
import { styled, CSS } from "./stitches.config";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",

  "& > *": {
    marginBlock: 0,
  },
});

interface Props {
  size: CSS["space"];
}

export const VerticalStack: React.FC<Props> = ({ children, size }) => {
  return (
    <Container
      css={{
        "& > * + *": {
          marginBlockStart: size,
        },
      }}
    >
      {children}
    </Container>
  );
};
