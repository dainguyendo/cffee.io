import { Bean, BrewMethod, Rating } from "db";
import isEqual from "lodash.isequal";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { PlusSquare } from "react-feather";
import { useForm } from "react-hook-form";
import { Descendant } from "slate";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Flex,
  Input,
  Label,
  RadioGroup,
  Select,
  Spacer,
  VerticalStack,
} from "ui";
import { createJournalEntry, useSetup } from "../api";
import { Field } from "../form/Field";
import { Center } from "../ui/Center";
import { EmojiIndicator, EmojiRadio } from "../ui/EmojiRadio";
import { Page } from "../ui/Page";
import { RichEditor } from "../ui/RichEditor";
import { SetupSummary } from "../ui/SetupSummary";
import { TemperatureSlider } from "../ui/TemperatureSlider";
import { INITIAL_FAHRENHEIT } from "../utils/constants";
import { BREW_METHOD_TO_STRING } from "../utils/copy";
import { INITIAL_EDITOR_CONTENT, toTimerBlocks } from "../utils/editor";
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
  const overrideRoast = watch("bean.roast");
  const overrideRoaster = watch("bean.roaster");
  const grinder = watch("grinder");

  const displayRoast = overrideRoast || setup?.bean?.roast;
  const displayRoaster = (overrideRoaster || setup?.bean?.roaster) ?? "";

  const overrideSetupBean = !!(overrideRoast || overrideRoaster);

  const submit = async (data: JournalFormData) => {
    const isEmptyNote = isEqual(INITIAL_EDITOR_CONTENT, data.note);
    await createJournalEntry({
      ...data,
      note: isEmptyNote ? undefined : data.note,
    });
    router.push("/home");
  };

  return (
    <Page>
      {/* <Text as="h1" variant="heading">
        Create journal entry
      </Text> */}

      <form onSubmit={handleSubmit(submit)}>
        <VerticalStack size="$3">
          <Collapsible>
            <SetupSummary
              grinder={grinder}
              brewMethod={brewMethod ?? undefined}
              bean={
                overrideSetupBean
                  ? { roast: displayRoast ?? "", roaster: displayRoaster ?? "" }
                  : setup?.bean
                  ? setup.bean
                  : undefined
              }
            />

            <Spacer size="3" />
            <Flex css={{ ai: "center" }}>
              <CollapsibleTrigger asChild>
                <Button variant="secondary" type="button">
                  <PlusSquare />
                  Using a different set up?
                </Button>
              </CollapsibleTrigger>
            </Flex>
            <Spacer size="1" />

            <CollapsibleContent>
              <Flex direction="column" css={{ gap: "$2" }}>
                <Field>
                  <Label htmlFor="roast">Roast</Label>
                  <Input {...register("bean.roast")} />
                </Field>
                <Field>
                  <Label htmlFor="roaster">Roaster</Label>
                  <Input {...register("bean.roaster")} />
                </Field>
                <Field>
                  <Label htmlFor="brewMethod">Brew method</Label>
                  <Select id="brewMethod" {...register("brewMethod")}>
                    {Object.values(BrewMethod).map((value) => {
                      return (
                        <option key={value} value={value}>
                          {BREW_METHOD_TO_STRING[value]}
                        </option>
                      );
                    })}
                  </Select>
                </Field>
                <Field>
                  <Label htmlFor="grinder">Grinder</Label>
                  <Input {...register("grinder")} />
                </Field>
              </Flex>
            </CollapsibleContent>
          </Collapsible>

          <Field>
            <Label htmlFor="grindDescription">Grind description</Label>
            <Input
              id="grindDescription"
              type="text"
              placeholder="Example: 9,or coarse"
              {...register("grindDescription")}
            />
          </Field>

          <Spacer size="3" />

          <Center css={{ width: "100%" }}>
            <TemperatureSlider
              fahrenheit={fahrenheit}
              onTemperatureChange={(value) =>
                setValue("waterTemperatureFahrenheit", value)
              }
            />
          </Center>

          <Spacer size="3" />

          <RichEditor
            placeholder="✨ How did it brew?"
            value={note}
            setValue={(value) => {
              setValue("note", value);
            }}
          />

          <Spacer size="3" />

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
