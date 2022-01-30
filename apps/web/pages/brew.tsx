import { Bean, BrewMethod, Rating } from "db";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { Maximize2, XCircle } from "react-feather";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Flex,
  Input,
  Label,
  styled,
  Text,
  Textarea,
  VisuallyHidden,
} from "ui";
import { createJournalEntry, useSetup } from "../api";
import { Field } from "../form/Field";
import { FieldGroupRow } from "../form/FieldGroupRow";
import { FieldLabel } from "../form/FieldLabel";
import { BrewMethodFields } from "../ui/BrewMethodFields";
import { EmojiRating } from "../ui/EmojiRating";
import { FullBleedLayout } from "../ui/FullBleedLayout";
import { Page } from "../ui/Page";
import { RadioZedStack } from "../ui/RadioZedStack";
import { TemperatureSlider } from "../ui/TemperatureSlider";
import { BREW_METHOD_TO_STRING } from "../utils/brew";
import { INITIAL_FAHRENHEIT } from "../utils/constants";

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
  note: string;
}

export default function Equipment() {
  const [expandBean, setExpandBean] = React.useState(true);
  const [expandGrinder, setExpandGrinder] = React.useState(true);
  const [expandBrewMethod, setExpandBrewMethod] = React.useState(true);

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

  const grinder = watch("grinder");
  const brewMethod = watch("brewMethod");
  const rating = watch("rating");
  const beanRating = watch("bean.rating");
  const fahrenheit = watch("waterTemperatureFahrenheit");

  const submit = async (data: JournalFormData) => {
    console.log(data);
    const entry = await createJournalEntry(data);
  };

  return (
    <Page>
      <Box css={{ p: "$8" }}>
        <form onSubmit={handleSubmit(submit)}>
          <Collapsible open={expandBean} onOpenChange={setExpandBean}>
            <Flex
              css={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Text>Beans brewing:</Text>
              <Text>
                {setup?.bean?.roast}, {setup?.bean?.roaster}
              </Text>
              <CollapsibleTrigger type="button">
                {expandBean ? <XCircle /> : <Maximize2 />}
              </CollapsibleTrigger>
            </Flex>

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
                <Label htmlFor="roast">General feelings for the bean</Label>

                <Box role="radiogroup" css={{ display: "flex" }}>
                  <EmojiRating
                    rating={rating}
                    onRatingChanged={(value) => setValue("bean.rating", value)}
                  />
                </Box>
              </Flex>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={expandGrinder} onOpenChange={setExpandGrinder}>
            <Flex
              css={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Text>Grinding with:</Text>
              <Text>{grinder}</Text>
              <CollapsibleTrigger type="button">
                {expandBean ? <XCircle /> : <Maximize2 />}
              </CollapsibleTrigger>
            </Flex>
            <Field>
              <Label htmlFor="grindDescription">Grind description</Label>
              <Input
                id="grindDescription"
                type="text"
                placeholder="Example: 9,or coarse"
                {...register("grindDescription")}
              />
            </Field>

            <CollapsibleContent>
              <Field>
                <Label htmlFor="grinder">Grinder</Label>
                <Input {...register("grinder")} />
              </Field>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={expandBrewMethod}
            onOpenChange={setExpandBrewMethod}
          >
            <Flex
              css={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Text>Brew method</Text>
              <Text>{brewMethod && BREW_METHOD_TO_STRING[brewMethod]}</Text>
              <CollapsibleTrigger type="button">
                {expandBean ? <XCircle /> : <Maximize2 />}
              </CollapsibleTrigger>
            </Flex>

            <CollapsibleContent>
              <BrewMethodFields
                selected={brewMethod}
                onBrewMethodChanged={(method) => setValue("brewMethod", method)}
              />
            </CollapsibleContent>
          </Collapsible>

          <Field>
            <Label htmlFor="note">Brew notes</Label>
            <Textarea
              id="note"
              {...register("note")}
              placeholder="Best brew yet!"
            />
          </Field>

          <Box role="radiogroup" css={{ display: "flex" }}>
            <EmojiRating
              rating={rating}
              onRatingChanged={(value) => setValue("rating", value)}
            />
          </Box>

          <TemperatureSlider
            fahrenheit={fahrenheit}
            onTemperatureChange={(value) =>
              setValue("waterTemperatureFahrenheit", value)
            }
          />

          <Button type="submit">Log brew</Button>
        </form>
      </Box>
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

  return {
    props: {
      session: await getSession(context),
    },
  };
};
