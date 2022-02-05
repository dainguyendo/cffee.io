import { BrewMethod } from "db";
import React from "react";
import { Coffee } from "react-feather";
import { Box, Flex, styled, Text, theme } from "ui";
import { BREW_METHOD_TO_STRING } from "../utils/copy";
import { Caption } from "./Caption";

export type Props = {
  selected: BrewMethod | null;
  onBrewMethodChanged: (method: BrewMethod) => void;
};

const Card = styled(Flex, {
  background: "white",
  borderRadius: "$xlarge",
  flex: "0 1 180px",
  border: "1px solid $gray100",
  flexDirection: "column",
  alignItems: "center",
  padding: "$4",

  '&[aria-checked="true"]': {
    border: "1px solid $purple600",
  },
});

const Backdrop = styled("div", {
  display: "grid",
  placeItems: "center",
  borderRadius: "$large",
  background: "$purple100",
  padding: "$5",
  width: 150,
  height: 150,
});

const Label = styled("label", {
  display: "flex",
  flexDirection: "column",
});

export const BrewMethodFields = ({ selected, onBrewMethodChanged }: Props) => {
  return (
    <>
      <Flex
        css={{ flexWrap: "wrap", justifyContent: "center", gap: "$3" }}
        role="radiogroup"
      >
        <Card
          role="radio"
          data-value={BrewMethod.AEROPRESS}
          onClick={() => {
            onBrewMethodChanged(BrewMethod.AEROPRESS);
          }}
          aria-checked={selected === BrewMethod.AEROPRESS}
          tabIndex={0}
        >
          <Backdrop>
            <Coffee color={theme.colors.purple600.value} size={48} />
          </Backdrop>
          <Box
            css={{
              background: "white",
              borderRadius: "$small",
              padding: "$2",
            }}
          >
            <Label>
              <Text css={{ fontWeight: "$bold", fontSize: "$3" }}>
                {BREW_METHOD_TO_STRING["AEROPRESS"]}
              </Text>
              <Caption>
                Some descirption about {BREW_METHOD_TO_STRING["AEROPRESS"]}{" "}
                coffee. Blah blah
              </Caption>
            </Label>
          </Box>
        </Card>
        <Card
          role="radio"
          data-value={BrewMethod.BIALETTI}
          onClick={() => {
            onBrewMethodChanged(BrewMethod.BIALETTI);
          }}
          aria-checked={selected === BrewMethod.BIALETTI}
          tabIndex={0}
        >
          <Backdrop>
            <Coffee color={theme.colors.purple600.value} size={48} />
          </Backdrop>
          <Box
            css={{
              background: "white",
              borderRadius: "$small",
              padding: "$2",
            }}
          >
            <Label>
              <Text css={{ fontWeight: "$bold", fontSize: "$3" }}>
                {BREW_METHOD_TO_STRING["BIALETTI"]}
              </Text>
              <Caption>
                Some descirption about {BREW_METHOD_TO_STRING["BIALETTI"]}{" "}
                coffee. Blah blah
              </Caption>
            </Label>
          </Box>
        </Card>
        <Card
          role="radio"
          data-value={BrewMethod.COLD_BREW}
          onClick={() => {
            onBrewMethodChanged(BrewMethod.COLD_BREW);
          }}
          aria-checked={selected === BrewMethod.COLD_BREW}
          tabIndex={0}
        >
          <Backdrop>
            <Coffee color={theme.colors.purple600.value} size={48} />
          </Backdrop>
          <Box
            css={{
              background: "white",
              borderRadius: "$small",
              padding: "$2",
            }}
          >
            <Label>
              <Text css={{ fontWeight: "$bold", fontSize: "$3" }}>
                {BREW_METHOD_TO_STRING["COLD_BREW"]}
              </Text>
              <Caption>
                Some descirption about {BREW_METHOD_TO_STRING["COLD_BREW"]}{" "}
                coffee. Blah blah
              </Caption>
            </Label>
          </Box>
        </Card>
        <Card
          role="radio"
          data-value={BrewMethod.ESPRESSO}
          onClick={() => {
            onBrewMethodChanged(BrewMethod.ESPRESSO);
          }}
          aria-checked={selected === BrewMethod.ESPRESSO}
          tabIndex={0}
        >
          <Backdrop>
            <Coffee color={theme.colors.purple600.value} size={48} />
          </Backdrop>
          <Box
            css={{
              background: "white",
              borderRadius: "$small",
              padding: "$2",
            }}
          >
            <Label>
              <Text css={{ fontWeight: "$bold", fontSize: "$3" }}>
                {BREW_METHOD_TO_STRING["ESPRESSO"]}
              </Text>
              <Caption>
                Some descirption about {BREW_METHOD_TO_STRING["ESPRESSO"]}{" "}
                coffee. Blah blah
              </Caption>
            </Label>
          </Box>
        </Card>
        <Card
          role="radio"
          data-value={BrewMethod.FRENCH_PRESS}
          onClick={() => {
            onBrewMethodChanged(BrewMethod.FRENCH_PRESS);
          }}
          aria-checked={selected === BrewMethod.FRENCH_PRESS}
          tabIndex={0}
        >
          <Backdrop>
            <Coffee color={theme.colors.purple600.value} size={48} />
          </Backdrop>
          <Box
            css={{
              background: "white",
              borderRadius: "$small",
              padding: "$2",
            }}
          >
            <Label>
              <Text css={{ fontWeight: "$bold", fontSize: "$3" }}>
                {BREW_METHOD_TO_STRING["FRENCH_PRESS"]}
              </Text>
              <Caption>
                Some descirption about {BREW_METHOD_TO_STRING["FRENCH_PRESS"]}{" "}
                coffee. Blah blah
              </Caption>
            </Label>
          </Box>
        </Card>
        <Card
          role="radio"
          data-value={BrewMethod.PHIN}
          onClick={() => {
            onBrewMethodChanged(BrewMethod.PHIN);
          }}
          aria-checked={selected === BrewMethod.PHIN}
          tabIndex={0}
        >
          <Backdrop>
            <Coffee color={theme.colors.purple600.value} size={48} />
          </Backdrop>
          <Box
            css={{
              background: "white",
              borderRadius: "$small",
              padding: "$2",
            }}
          >
            <Label>
              <Text css={{ fontWeight: "$bold", fontSize: "$3" }}>
                {BREW_METHOD_TO_STRING["PHIN"]}
              </Text>
              <Caption>
                Some descirption about {BREW_METHOD_TO_STRING["PHIN"]} coffee.
                Blah blah
              </Caption>
            </Label>
          </Box>
        </Card>
        <Card
          role="radio"
          data-value={BrewMethod.POUR_OVER}
          onClick={() => {
            onBrewMethodChanged(BrewMethod.POUR_OVER);
          }}
          aria-checked={selected === BrewMethod.POUR_OVER}
          tabIndex={0}
        >
          <Backdrop>
            <Coffee color={theme.colors.purple600.value} size={48} />
          </Backdrop>
          <Box
            css={{
              background: "white",
              borderRadius: "$small",
              padding: "$2",
            }}
          >
            <Label>
              <Text css={{ fontWeight: "$bold", fontSize: "$3" }}>
                {BREW_METHOD_TO_STRING["POUR_OVER"]}
              </Text>
              <Caption>
                Some descirption about {BREW_METHOD_TO_STRING["POUR_OVER"]}{" "}
                coffee. Blah blah
              </Caption>
            </Label>
          </Box>
        </Card>
      </Flex>
    </>
  );
};
