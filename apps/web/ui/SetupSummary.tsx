import Avatar from "boring-avatars";
import { Bean, BrewMethod } from "db";
import { Box, Flex, styled, Text, theme } from "ui";
import { BREW_METHOD_TO_STRING } from "../utils/copy";

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

interface Props {
  bean?: Pick<Bean, "roast" | "roaster">;
  brewMethod?: BrewMethod;
  grinder?: string;
}

export const SetupSummary = ({ bean, brewMethod, grinder }: Props) => {
  if (!bean && !brewMethod && !grinder) {
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
      {grinder && (
        <Cell>
          <SetupAvatar name={grinder ?? "Grinder"} />
          <Flex direction="column">
            <Value>{grinder}</Value>
            <SectionTitle>Grinder</SectionTitle>
          </Flex>
        </Cell>
      )}
      {brewMethod && (
        <Cell>
          <SetupAvatar name={BREW_METHOD_TO_STRING[brewMethod]} />
          <Flex direction="column">
            <Value>{BREW_METHOD_TO_STRING[brewMethod]}</Value>
            <SectionTitle>Brew method</SectionTitle>
          </Flex>
        </Cell>
      )}
      {bean && (
        <Cell>
          <SetupAvatar name={bean.roast ?? "Beans"} />
          <Flex direction="column">
            <Value>
              {bean.roast}, {bean.roaster}
            </Value>
            <SectionTitle>Beans</SectionTitle>
          </Flex>
        </Cell>
      )}
    </Box>
  );
};
