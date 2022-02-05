import { Box, styled, Text } from "ui";
import { useSetup } from "../api";
import { BREW_METHOD_TO_STRING } from "../utils/copy";

const SectionTitle = styled(Text, {
  textTransform: "lowercase",
  fontSize: "$1",
  color: "$pink500",
  fontWeight: "$semiBold",
});

const Value = styled(Text, {
  textTransform: "uppercase",
  fontSize: "$3",
  color: "$pink600",
  fontWeight: "$bold",
});

const Cell = styled(Box, {
  display: "flex",
  fd: "column",
  ai: "center",
  jc: "center",
  width: "100%",
  height: "100%",
});

export const SetupSummary = () => {
  const { data } = useSetup();

  return (
    <Box
      css={{
        p: "$3",
        backgroundColor: "$pink200",
        br: "$large",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        placeItems: "center",
      }}
    >
      <Cell css={{ borderRight: "2px solid $pink500" }}>
        <SectionTitle>Grinder</SectionTitle>
        <Value>{data?.grinder}</Value>
      </Cell>
      {data?.brewMethod && (
        <Cell>
          <SectionTitle>Brew method</SectionTitle>
          <Value>{BREW_METHOD_TO_STRING[data?.brewMethod]}</Value>
        </Cell>
      )}
      <Cell css={{ borderLeft: "2px solid $pink500" }}>
        <SectionTitle>Beans</SectionTitle>
        <Value>{data?.bean?.roast}</Value>
        <Value css={{ fontSize: "$2" }}>{data?.bean?.roaster}</Value>
      </Cell>
    </Box>
  );
};
