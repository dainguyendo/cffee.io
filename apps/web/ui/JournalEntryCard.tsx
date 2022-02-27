import Avatar from "boring-avatars";
import isEqual from "lodash.isequal";
import React from "react";
import { Calendar, Maximize2, Minimize2 } from "react-feather";
import { JournalEntryData } from "types";
import {
  Box,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Flex,
  IconButton,
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
import { INITIAL_EDITOR_CONTENT } from "../utils/editor";
import { Badge } from "./Badge";
import { ReadonlyEditor } from "./ReadonlyEditor";

interface Props {
  journalEntry: JournalEntryData;
}

const Card = styled(Collapsible, {
  background: "$blackDamp",
  borderRadius: "$medium",
  boxShadow: `
    1.8px 1.4px 2.7px rgba(0, 0, 0, 0.018),
    4.4px 3.5px 6.9px rgba(0, 0, 0, 0.024),
    9px 7.1px 14.2px rgba(0, 0, 0, 0.029),
    18.6px 14.6px 29.2px rgba(0, 0, 0, 0.039),
    51px 40px 80px rgba(0, 0, 0, 0.07)
  `,

  display: "flex",
  gap: "$4",
  padding: "$4",
  position: "relative",

  variants: {
    span: {
      true: {
        gridColumnEnd: "span 2",
      },
    },
  },
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

  const hasNote = React.useMemo(() => {
    return note && !isEqual(INITIAL_EDITOR_CONTENT, note);
  }, [note]);

  const emoji = RATING_TO_EMOJI[rating];
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
  }).format(new Date(updatedAt));
  const time = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  }).format(new Date(updatedAt));

  return (
    <Card span={hasNote} open={open} onOpenChange={setOpen}>
      <Box css={{ flex: "0 0 48px" }}>
        <Avatar
          name={id}
          size={48}
          variant="marble"
          square={false}
          colors={[
            theme.colors.primary.value,
            theme.colors.secondary.value,
            theme.colors.tertiary.value,
            theme.colors.background.value,
          ]}
        />
      </Box>

      <Flex direction="column" css={{ gap: "$3", width: "100%" }}>
        <Flex css={{ flexGrow: 1, jc: "space-between" }}>
          <div>
            <Text variant="heading" bold css={{ fontSize: "$3" }}>
              {bean.roast}
            </Text>

            <Flex css={{ ai: "center", gap: "$1" }}>
              <Calendar size={15} color={theme.colors["tertiary"].value} />
              <Text variant="caption">
                {date}, {time}
              </Text>
            </Flex>
          </div>

          {hasNote && (
            <CollapsibleTrigger asChild>
              <IconButton type="button" raised>
                {open ? <Minimize2 /> : <Maximize2 />}
              </IconButton>
            </CollapsibleTrigger>
          )}
        </Flex>

        {hasNote && (
          <CollapsibleContent>
            <ReadonlyEditor value={note} />
          </CollapsibleContent>
        )}

        {grindDescription && (
          <Field>
            <Label htmlFor={`${id}-gd`}>Grind description</Label>
            <Input id={`${id}-gd`} readOnly value={grindDescription} />
          </Field>
        )}
        <Badge css={{ alignSelf: "flex-end" }}>{grinder}</Badge>
        <Flex css={{ gap: "$2", justifyContent: "flex-end" }}>
          <Badge>{emoji}</Badge>
          <Badge>{BREW_METHOD_TO_STRING[brewMethod]}</Badge>

          <Badge>
            {withDegreeUnit(waterTemperatureFahrenheit, "fahrenheit")}
          </Badge>
        </Flex>
      </Flex>
    </Card>
  );
};
