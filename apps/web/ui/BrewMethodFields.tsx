import { BrewMethod } from "db";
import React from "react";
import { Coffee } from "react-feather";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem, styled } from "ui";
import { BREW_METHOD_TO_STRING } from "../utils/copy";

const BrewMethodRadioItem = styled(RadioGroupItem, {
  all: "unset",
  background: "inherit",
  border: "1px solid transparent",
  borderRadius: "$small",
  color: "$paragraph",
  display: "flex",
  gap: "$1",
  p: "$2",
  position: "relative",

  "& svg": {
    stroke: "$paragraph",
  },

  "&:hover": { background: "$background" },
  "&:focus": { border: "1px solid $primary" },
});

const Indicator = styled(RadioGroupIndicator, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 4,
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  background:
    "linear-gradient(62deg, #f37286 0%, #ef81ae 16%, #ec90cc 33%, #ea9ee2 50%, #d6b5e8 66%, #d0c5e8 83%, #d2d2e9 100%)",
});

const BrewMethodItemIcon = () => <Coffee size={24} />;

interface Props {
  selected: BrewMethod | null;
  onBrewMethodChanged: (method: BrewMethod) => void;
}

export const BrewMethodFields = ({ selected, onBrewMethodChanged }: Props) => {
  return (
    <RadioGroup
      defaultValue={selected ?? undefined}
      onValueChange={(value) => onBrewMethodChanged(value as BrewMethod)}
    >
      <BrewMethodRadioItem value={BrewMethod.AEROPRESS}>
        <BrewMethodItemIcon />
        {BREW_METHOD_TO_STRING["AEROPRESS"]}
        <Indicator />
      </BrewMethodRadioItem>
      <BrewMethodRadioItem value={BrewMethod.BIALETTI}>
        <BrewMethodItemIcon />
        {BREW_METHOD_TO_STRING["BIALETTI"]}
        <Indicator />
      </BrewMethodRadioItem>
      <BrewMethodRadioItem value={BrewMethod.COLD_BREW}>
        <BrewMethodItemIcon />
        {BREW_METHOD_TO_STRING["COLD_BREW"]}
        <Indicator />
      </BrewMethodRadioItem>
      <BrewMethodRadioItem value={BrewMethod.ESPRESSO}>
        <BrewMethodItemIcon />
        {BREW_METHOD_TO_STRING["ESPRESSO"]}
        <Indicator />
      </BrewMethodRadioItem>
      <BrewMethodRadioItem value={BrewMethod.FRENCH_PRESS}>
        <BrewMethodItemIcon />
        {BREW_METHOD_TO_STRING["FRENCH_PRESS"]}
        <Indicator />
      </BrewMethodRadioItem>
      <BrewMethodRadioItem value={BrewMethod.PHIN}>
        <BrewMethodItemIcon />
        {BREW_METHOD_TO_STRING["PHIN"]}
        <Indicator />
      </BrewMethodRadioItem>
      <BrewMethodRadioItem value={BrewMethod.POUR_OVER}>
        <BrewMethodItemIcon />
        {BREW_METHOD_TO_STRING["POUR_OVER"]}
        <Indicator />
      </BrewMethodRadioItem>
    </RadioGroup>
  );
};
