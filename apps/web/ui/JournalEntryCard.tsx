import Avatar from "boring-avatars";
import React from "react";
import { Calendar } from "react-feather";
import { JournalEntryData } from "types";
import {
  Box,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Flex,
  Input,
  Label,
  styled,
  Text,
  theme,
} from "ui";
import { Field } from "../form/Field";
import {
  BREW_METHOD_TO_STRING,
  RATING_TO_EMOJI,
  withDegreeUnit,
} from "../utils/copy";
import { Badge } from "./Badge";
import { ReadonlyEditor } from "./ReadonlyEditor";

interface Props {
  journalEntry: JournalEntryData;
}

const Card = styled(Collapsible, {
  borderRadius: "$medium",
  display: "flex",
  gap: "$4",
  padding: "$4",
  position: "relative",
});

export const JournalEntryCard = ({ journalEntry }: Props) => {
  const {
    id,
    brewMethod,
    rating,
    updatedAt,
    bean,
    note,
    grinder,
    grindDescription,
    waterTemperatureFahrenheit,
  } = journalEntry;

  const [open, setOpen] = React.useState(false);

  const emoji = RATING_TO_EMOJI[rating];
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
  }).format(new Date(updatedAt));
  const time = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  }).format(new Date(updatedAt));

  return (
    <Card open={open} onOpenChange={setOpen}>
      <Box css={{ flex: "0 0 48px" }}>
        <Avatar
          name={id}
          size={48}
          variant="marble"
          square={false}
          colors={[
            "hsla(338, 24%, 91%, 1)",
            "hsla(340, 33%, 88%, 1)",
            "hsla(345, 52%, 86%, 1)",
            "hsla(348, 74%, 84%, 1)",
            "hsla(351, 81%, 82%, 1)",
            "hsla(351, 84%, 70%, 1)",
          ]}
        />
      </Box>

      <CollapsibleTrigger asChild>
        <Flex role="button" direction="column" css={{ gap: "$3" }}>
          <Box css={{ flexGrow: 1 }}>
            <Text bold css={{ color: "$pink600", fontSize: "$3" }}>
              {bean.roast}
            </Text>

            <Flex css={{ ai: "center", gap: "$1" }}>
              <Calendar size={15} color={theme.colors["gray400"].value} />
              <Text bold css={{ fontSize: "$1", color: "$gray400" }}>
                {date}, {time}
              </Text>
            </Flex>
          </Box>

          <CollapsibleContent>
            {note && <ReadonlyEditor value={note} />}
            {grindDescription && (
              <Field>
                <Label htmlFor={`${id}-gd`}>Grind description</Label>
                <Input id={`${id}-gd`} readOnly value={grindDescription} />
              </Field>
            )}
          </CollapsibleContent>

          <Flex css={{ gap: "$2", justifyContent: "flex-end" }}>
            <Badge variant="gray">{emoji}</Badge>
            <Badge variant="gray">{BREW_METHOD_TO_STRING[brewMethod]}</Badge>
            <Badge variant="gray">{grinder}</Badge>
            <Badge variant="gray">
              {withDegreeUnit(waterTemperatureFahrenheit, "fahrenheit")}
            </Badge>
          </Flex>
        </Flex>
      </CollapsibleTrigger>
    </Card>
  );
};
