import { Box, Flex, styled, Text, theme } from "ui";
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
        theme.colors.primary.value,
        theme.colors.secondary.value,
        theme.colors.tertiary.value,
        theme.colors.background.value,
      ]}
    />
  </div>
);

export const SetupSummary = () => {
  const { data, status } = useSetup();

  if (status === "loading") {
    return (
      <Box
        gradient
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

  if (status === "success" && !data) {
    return null;
  }

  return (
    <Box
      gradient
      boxShadow="medium"
      css={{
        p: "$4",
        width: "fit-content",
        borderRadius: "$large",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "$2",
        alignSelf: "flex-start",
      }}
    >
      {data?.grinder && (
        <Cell>
          <SetupAvatar name={data?.grinder ?? "Grinder"} />
          <Flex direction="column">
            <Value>{data?.grinder}</Value>
            <SectionTitle>Grinder</SectionTitle>
          </Flex>
        </Cell>
      )}
      {data?.brewMethod && (
        <Cell>
          <SetupAvatar name={BREW_METHOD_TO_STRING[data?.brewMethod]} />
          <Flex direction="column">
            <Value>{BREW_METHOD_TO_STRING[data?.brewMethod]}</Value>
            <SectionTitle>Brew method</SectionTitle>
          </Flex>
        </Cell>
      )}
      {data?.bean && (
        <Cell>
          <SetupAvatar name={data?.bean?.roast ?? "Beans"} />
          <Flex direction="column">
            <Value>
              {data?.bean?.roast}, {data?.bean?.roaster}
            </Value>
            <SectionTitle>Beans</SectionTitle>
          </Flex>
        </Cell>
      )}
    </Box>
  );
};
