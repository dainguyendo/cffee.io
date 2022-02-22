import { Bean, BrewMethod, Rating } from "db";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { Descendant } from "slate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Flex,
  Input,
  Label,
  RadioGroup,
  Spacer,
  Text,
  VerticalStack,
} from "ui";
import { createJournalEntry, useSetup } from "../api";
import { Field } from "../form/Field";
import { FieldGroupRow } from "../form/FieldGroupRow";
import { BrewMethodFields } from "../ui/BrewMethodFields";
import { Center } from "../ui/Center";
import { EmojiIndicator, EmojiRadio } from "../ui/EmojiRadio";
import { Page } from "../ui/Page";
import { RichEditor } from "../ui/RichEditor";
import { TemperatureSlider } from "../ui/TemperatureSlider";
import { INITIAL_FAHRENHEIT } from "../utils/constants";
import { BREW_METHOD_TO_STRING } from "../utils/copy";
import { INITIAL_EDITOR_CONTENT, toTimerBlocks } from "../utils/editor";
import isEqual from "lodash.isequal";

type Accordions = "method" | "bean";
interface JournalFormData {
  beanId: string | null;
  bean: Pick<
    Bean,
    "roast" | "roaster" | "singleOrigin" | "state" | "countryCode" | "rating"
  > | null;
  brewMethod: BrewMethod | null;
  rating: Rating;
  grinder: string;
  grindDescription: string;
  waterTemperatureFahrenheit: number;
  note: Descendant[];
}

interface Props {
  timer: {
    time: number;
    laps: number[];
  } | null;
}

export default function Equipment({ timer }: Props) {
  const router = useRouter();
  const [expanded, expand] = React.useState<Accordions | undefined>();

  const { data: setup } = useSetup();

  const { register, reset, watch, setValue, getValues, handleSubmit } =
    useForm<JournalFormData>({
      defaultValues: {
        beanId: "",
        bean: null,
        brewMethod: null,
        grinder: "",
        grindDescription: "",
        waterTemperatureFahrenheit: INITIAL_FAHRENHEIT,
        note: timer ? toTimerBlocks(timer) : INITIAL_EDITOR_CONTENT,
      },
    });

  React.useEffect(() => {
    if (setup) {
      reset({
        ...getValues(),
        ...(setup.beanId && {
          beanId: setup.beanId,
          bean: null,
        }),
        ...(setup.grinder && { grinder: setup.grinder }),
        ...(setup.brewMethod && { brewMethod: setup.brewMethod }),
      });
    }
  }, [setup, reset, getValues]);

  const brewMethod = watch("brewMethod");
  const rating = watch("rating");
  const fahrenheit = watch("waterTemperatureFahrenheit");
  const note = watch("note");

  const displayRoast = watch("bean.roast") || setup?.bean?.roast;
  const displayRoaster = (watch("bean.roaster") || setup?.bean?.roaster) ?? "";

  const submit = async (data: JournalFormData) => {
    const isEmptyNote = isEqual(INITIAL_EDITOR_CONTENT, data.note);
    await createJournalEntry({
      ...data,
      note: isEmptyNote ? undefined : data.note,
    });
    router.push("/home");
  };

  const toggle = (accordion: Accordions) => {
    expand(accordion === expanded ? undefined : accordion);
  };

  return (
    <Page>
      <form onSubmit={handleSubmit(submit)}>
        <Accordion
          type="single"
          collapsible
          value={expanded}
          onValueChange={toggle}
        >
          <AccordionItem value="bean">
            <AccordionTrigger type="button">
              {expanded === "bean" ? (
                <Text>Editing bean selection...</Text>
              ) : (
                <Text>
                  {displayRoast
                    ? `${displayRoast}, ${displayRoaster}`
                    : "What beans are you brewing with?"}
                </Text>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <Flex direction="column" css={{ gap: "$2" }}>
                <FieldGroupRow>
                  <Field>
                    <Label htmlFor="roast">Roast</Label>
                    <Input {...register("bean.roast")} />
                  </Field>
                  <Field>
                    <Label htmlFor="roaster">Roaster</Label>
                    <Input {...register("bean.roaster")} />
                  </Field>
                </FieldGroupRow>
                <Field variant="row">
                  <Input type="checkbox" {...register("bean.singleOrigin")} />
                  <Label htmlFor="roast">Single origin?</Label>
                </Field>
                <FieldGroupRow>
                  <Field>
                    <Label htmlFor="roast">State</Label>
                    <Input {...register("bean.state")} />
                  </Field>
                  <Field>
                    <Label htmlFor="roast">Country</Label>
                    <Input {...register("bean.countryCode")} />
                  </Field>
                </FieldGroupRow>
              </Flex>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="method">
            <AccordionTrigger type="button">
              {expanded === "method" ? (
                <Text>Selecting brew method...</Text>
              ) : (
                <Text>{brewMethod && BREW_METHOD_TO_STRING[brewMethod]}</Text>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <BrewMethodFields
                selected={brewMethod}
                onBrewMethodChanged={(method) => setValue("brewMethod", method)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <VerticalStack size="$3">
          <Field>
            <Label htmlFor="grinder">Grinder</Label>
            <Input {...register("grinder")} />
          </Field>
          <Field>
            <Label htmlFor="grindDescription">Grind description</Label>
            <Input
              id="grindDescription"
              type="text"
              placeholder="Example: 9,or coarse"
              {...register("grindDescription")}
            />
          </Field>

          <Center css={{ width: "100%" }}>
            <TemperatureSlider
              fahrenheit={fahrenheit}
              onTemperatureChange={(value) =>
                setValue("waterTemperatureFahrenheit", value)
              }
            />
          </Center>

          <RichEditor
            placeholder="✨ How did it brew?"
            value={note}
            setValue={(value) => setValue("note", value)}
          />

          <RadioGroup
            value={rating}
            onValueChange={(value) => setValue("rating", (value as Rating)!)}
            css={{ display: "flex", gap: "$1", alignSelf: "center" }}
          >
            <EmojiRadio id="rating-very-bad" value={Rating.VERY_BAD}>
              <EmojiIndicator>😢</EmojiIndicator>
              <label htmlFor="rating-very-bad">😢</label>
            </EmojiRadio>

            <EmojiRadio id="rating-bad" value={Rating.BAD}>
              <EmojiIndicator>🙁</EmojiIndicator>
              <label htmlFor="rating-bad">🙁</label>
            </EmojiRadio>
            <EmojiRadio id="rating-average" value={Rating.AVERAGE}>
              <EmojiIndicator>😐</EmojiIndicator>
              <label htmlFor="rating-average">😐</label>
            </EmojiRadio>
            <EmojiRadio id="rating-good" value={Rating.GOOD}>
              <EmojiIndicator>🙂</EmojiIndicator>
              <label htmlFor="rating-good">🙂</label>
            </EmojiRadio>
            <EmojiRadio id="rating-very-good" value={Rating.VERY_GOOD}>
              <EmojiIndicator>😍</EmojiIndicator>
              <label htmlFor="rating-very-good">😍</label>
            </EmojiRadio>
          </RadioGroup>

          <Spacer direction="vertical" size="2" />
          <Button type="submit">Log brew</Button>
        </VerticalStack>
      </form>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const fromTimer = context.query.time;

  const laps = Array.isArray(context.query.laps)
    ? context.query.laps
    : context.query.laps
    ? [context.query.laps]
    : [];

  return {
    props: {
      session: await getSession(context),
      timer: fromTimer
        ? {
            time: Number(context.query.time),
            laps: laps.map(Number).sort((a, b) => a - b),
          }
        : null,
    },
  };
};
