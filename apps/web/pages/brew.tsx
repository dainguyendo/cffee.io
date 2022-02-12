import { Bean, BrewMethod, Rating } from "db";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Maximize2, XCircle } from "react-feather";
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
  Separator,
  Text,
} from "ui";
import { createJournalEntry, useSetup } from "../api";
import { Field } from "../form/Field";
import { FieldGroupRow } from "../form/FieldGroupRow";
import { BrewMethodFields } from "../ui/BrewMethodFields";
import { Caption } from "../ui/Caption";
import { Center } from "../ui/Center";
import { EmojiIndicator, EmojiRadio } from "../ui/EmojiRadio";
import { IconToggle } from "../ui/IconToggle";
import { Page } from "../ui/Page";
import { RichEditor } from "../ui/RichEditor";
import { TemperatureSlider } from "../ui/TemperatureSlider";
import { INITIAL_FAHRENHEIT } from "../utils/constants";
import { BREW_METHOD_TO_STRING } from "../utils/copy";

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
  const [expandBean, setExpandBean] = React.useState(false);
  const [expandBrewMethod, setExpandBrewMethod] = React.useState(false);

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
        note: [{ type: "paragraph", children: [{ text: "" }] }],
        // note: timer ? `${timer.time}, ${timer.laps.join(",")}` : "",
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
  const beanRating = watch("bean.rating");
  const fahrenheit = watch("waterTemperatureFahrenheit");
  const note = watch("note");

  const submit = async (data: JournalFormData) => {
    await createJournalEntry(data);
    router.push("/home");
  };

  return (
    <Page>
      <form onSubmit={handleSubmit(submit)}>
        <Collapsible open={expandBean} onOpenChange={setExpandBean}>
          <Flex css={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text bold css={{ fontSize: "$4" }}>
              Beans
            </Text>

            <CollapsibleTrigger asChild>
              <IconToggle>
                {expandBean ? <XCircle /> : <Maximize2 />}
              </IconToggle>
            </CollapsibleTrigger>
          </Flex>

          <Text as="p">
            {setup?.bean?.roast}, {setup?.bean?.roaster}
          </Text>

          <CollapsibleContent>
            <Flex direction="column">
              <Text>Overwrite with beans on the fly</Text>
              <Field>
                <Label htmlFor="roast">Roast</Label>
                <Input {...register("bean.roast")} />
              </Field>
              <Label htmlFor="roaster">Roaster</Label>
              <Input {...register("bean.roaster")} />
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
          </CollapsibleContent>
        </Collapsible>

        <Separator css={{ my: "$4" }} />

        <Text bold css={{ fontSize: "$4" }}>
          Grind
        </Text>
        <FieldGroupRow>
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
        </FieldGroupRow>

        <Separator css={{ my: "$4" }} />

        <Collapsible open={expandBrewMethod} onOpenChange={setExpandBrewMethod}>
          <Flex css={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text bold css={{ fontSize: "$4" }}>
              Brew method
            </Text>

            <CollapsibleTrigger asChild>
              <IconToggle>
                {expandBrewMethod ? <XCircle /> : <Maximize2 />}
              </IconToggle>
            </CollapsibleTrigger>
          </Flex>

          <Text as="p">{brewMethod && BREW_METHOD_TO_STRING[brewMethod]}</Text>

          <CollapsibleContent>
            <BrewMethodFields
              selected={brewMethod}
              onBrewMethodChanged={(method) => setValue("brewMethod", method)}
            />
          </CollapsibleContent>
        </Collapsible>

        <Separator css={{ my: "$4" }} />

        <TemperatureSlider
          fahrenheit={fahrenheit}
          onTemperatureChange={(value) =>
            setValue("waterTemperatureFahrenheit", value)
          }
        />

        <Separator css={{ my: "$4" }} />

        <Text bold css={{ fontSize: "$4" }}>
          How&apos;d it brew?
        </Text>
        <Caption as="p">Leave your thoughts, take your coffee</Caption>
        <RichEditor
          value={note}
          setValue={(value) => setValue("note", value)}
        />

        <Center>
          <RadioGroup
            value={rating}
            onValueChange={(value) => setValue("rating", (value as Rating)!)}
            css={{ display: "flex", gap: "$1" }}
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
        </Center>

        <Button type="submit">Log brew</Button>
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
  const laps = (Array.isArray(context.query.laps) && context.query.laps) || [];

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
