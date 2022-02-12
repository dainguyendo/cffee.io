import { Box, styled, Text } from "ui";
import { useSetup } from "../api";
import { BREW_METHOD_TO_STRING } from "../utils/copy";
import Avatar from "boring-avatars";

const SectionTitle = styled(Text, {
  fontSize: "$1",
  fontWeight: "$semiBold",
  color: "$gray300",
});

const Value = styled(Text, {
  fontWeight: "$bold",
});

const Cell = styled(Box, {
  display: "flex",
  fd: "column",
  jc: "center",
  width: "100%",
  height: "100%",
});

const SetupAvatar = ({ name }: { name: string }) => (
  <div style={{ alignSelf: "center" }}>
    <Avatar
      size={64}
      square
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
  const { data } = useSetup();

  return (
    <>
      <Box
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          placeItems: "center",
        }}
      >
        <Cell>
          <SetupAvatar name={data?.grinder ?? "Grinder"} />
          <Value>{data?.grinder}</Value>
          <SectionTitle>Grinder</SectionTitle>
        </Cell>
        {data?.brewMethod && (
          <Cell>
            <SetupAvatar name={BREW_METHOD_TO_STRING[data?.brewMethod]} />
            <Value>{BREW_METHOD_TO_STRING[data?.brewMethod]}</Value>
            <SectionTitle>Brew method</SectionTitle>
          </Cell>
        )}
        <Cell>
          <SetupAvatar name={data?.bean?.roast ?? "Beans"} />
          <Value>
            {data?.bean?.roast}, {data?.bean?.roaster}
          </Value>
          <SectionTitle>Beans</SectionTitle>
        </Cell>
      </Box>
    </>
  );
};
