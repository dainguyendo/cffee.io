import { Box, Flex, styled, Text } from "ui";
import { useSetup } from "../api";
import { BREW_METHOD_TO_STRING } from "../utils/copy";
import Avatar from "boring-avatars";

const SectionTitle = styled(Text, {
  fontSize: "$1",
});

const Value = styled(Text, {
  fontWeight: "$bold",
});

const Cell = styled(Flex, {
  gap: "$1",
  flex: "1 1 225px",
});

const SetupAvatar = ({ name }: { name: string }) => (
  <div style={{ alignSelf: "center" }}>
    <Avatar
      size={24}
      variant="marble"
      name={name}
      colors={[
        "hsla(240, 35%, 87%, 1)",
        "hsla(240, 35%, 75%, 1)",
        "hsla(240, 50%, 68%, 1)",
        "hsla(240, 60%, 65%, 1)",
        "hsla(250, 65%, 60%, 1)",
        "hsla(250, 80%, 60%, 1)",
        "hsla(338, 24%, 91%, 1)",
        "hsla(340, 33%, 88%, 1)",
        "hsla(345, 52%, 86%, 1)",
        "hsla(348, 74%, 84%, 1)",
        "hsla(351, 81%, 82%, 1)",
        "hsla(351, 84%, 70%, 1)",
      ]}
    />
  </div>
);

export const SetupSummary = () => {
  const { data, status } = useSetup();

  if (status === "loading") {
    return (
      <Box
        gradiant
        boxShadow="medium"
        css={{
          borderRadius: "$large",
          width: "100%",
          minHeight: 150,
          "@bp1": {
            minHeight: 45,
          },
        }}
      />
    );
  }

  return (
    <Box
      gradiant
      boxShadow="medium"
      css={{
        p: "$4",
        width: "100%",
        borderRadius: "$large",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "$2",
      }}
    >
      <Cell>
        <SetupAvatar name={data?.grinder ?? "Grinder"} />
        <Flex direction="column">
          <Value>{data?.grinder}</Value>
          <SectionTitle>Grinder</SectionTitle>
        </Flex>
      </Cell>
      {data?.brewMethod && (
        <Cell>
          <SetupAvatar name={BREW_METHOD_TO_STRING[data?.brewMethod]} />
          <Flex direction="column">
            <Value>{BREW_METHOD_TO_STRING[data?.brewMethod]}</Value>
            <SectionTitle>Brew method</SectionTitle>
          </Flex>
        </Cell>
      )}
      <Cell>
        <SetupAvatar name={data?.bean?.roast ?? "Beans"} />
        <Flex direction="column">
          <Value>
            {data?.bean?.roast}, {data?.bean?.roaster}
          </Value>
          <SectionTitle>Beans</SectionTitle>
        </Flex>
      </Cell>
    </Box>
  );
};
