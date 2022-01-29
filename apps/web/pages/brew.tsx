import { Bean, BrewMethod, Rating } from "db";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { Maximize2, XCircle } from "react-feather";
import { useForm } from "react-hook-form";
import {
  Box,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Flex,
  styled,
  Text,
  VisuallyHidden,
} from "ui";
import { useSetup } from "../api";
import { BeanForm } from "../ui/BeanForm";
import { BrewMethodForm } from "../ui/BrewMethodForm";
import { GrinderForm } from "../ui/GrinderForm";
import { Page } from "../ui/Page";
import { RadioZedStack } from "../ui/RadioZedStack";
import { BREW_METHOD_TO_STRING } from "../utils/brew";

const Input = styled("input", {
  appearance: "none",
});

interface JournalFormData {
  beanId: string | null;
  bean: Pick<
    Bean,
    "roast" | "roaster" | "singleOrigin" | "state" | "countryCode"
  > | null;
  brewMethod: BrewMethod | null;
  rating: Rating;
  grinder: string;
  grindDescription: string;
  waterTemperatureFahrenheit: number;
}

export default function Equipment() {
  const [expandBean, setExpandBean] = React.useState(false);
  const [expandGrinder, setExpandGrinder] = React.useState(false);
  const [expandBrewMethod, setExpandBrewMethod] = React.useState(false);

  const { data: setup } = useSetup();

  const { register, reset, watch } = useForm<JournalFormData>({
    defaultValues: {
      beanId: "",
      bean: null,
      brewMethod: null,
      grinder: "",
      grindDescription: "",
      waterTemperatureFahrenheit: 0,
    },
  });

  React.useEffect(() => {
    if (setup) {
      reset({
        ...(setup.beanId && {
          beanId: setup.beanId,
          bean: null,
        }),
        ...(setup.grinder && { grinder: setup.grinder }),
        ...(setup.brewMethod && { brewMethod: setup.brewMethod }),
      });
    }
  }, [setup, reset]);

  const grinder = watch("grinder");
  const brewMethod = watch("brewMethod");
  const rating = watch("rating");

  return (
    <Page>
      <Box css={{ p: "$8" }}>
        <form>
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
              <Text>Overwrite with beans on the fly</Text>
              <BeanForm />
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
              <label htmlFor="grindDescription">
                <Text>Grind description</Text>
                <Text>E.g. grind size like number or setting on equipment</Text>
              </label>
              <input
                id="grindDescription"
                type="text"
                {...register("grindDescription")}
              />
            </Flex>

            <CollapsibleContent>
              <GrinderForm />
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
              <BrewMethodForm />
            </CollapsibleContent>
          </Collapsible>

          <Box css={{ display: "flex" }}>
            <RadioZedStack selected={rating === Rating.VERY_BAD}>
              <label htmlFor={Rating.VERY_BAD}>
                🤮
                <VisuallyHidden>{Rating.VERY_BAD}</VisuallyHidden>
              </label>
              <Input
                {...register("rating")}
                id={Rating.VERY_BAD}
                type="radio"
                value={Rating.VERY_BAD}
              />
            </RadioZedStack>

            <RadioZedStack selected={rating === Rating.BAD}>
              <label htmlFor={Rating.BAD}>
                🙁
                <VisuallyHidden>{Rating.BAD}</VisuallyHidden>
              </label>
              <Input
                {...register("rating")}
                id={Rating.BAD}
                type="radio"
                value={Rating.BAD}
              />
            </RadioZedStack>

            <RadioZedStack selected={rating === Rating.AVERAGE}>
              <label htmlFor={Rating.AVERAGE}>
                😐
                <VisuallyHidden>{Rating.AVERAGE}</VisuallyHidden>
              </label>
              <Input
                {...register("rating")}
                id={Rating.AVERAGE}
                type="radio"
                value={Rating.AVERAGE}
              />
            </RadioZedStack>

            <RadioZedStack selected={rating === Rating.GOOD}>
              <label htmlFor={Rating.GOOD}>
                🙂
                <VisuallyHidden>{Rating.GOOD}</VisuallyHidden>
              </label>
              <Input
                {...register("rating")}
                id={Rating.GOOD}
                type="radio"
                value={Rating.GOOD}
              />
            </RadioZedStack>

            <RadioZedStack selected={rating === Rating.VERY_GOOD}>
              <label htmlFor={Rating.VERY_GOOD}>
                😍
                <VisuallyHidden>{Rating.VERY_GOOD}</VisuallyHidden>
              </label>
              <Input
                {...register("rating")}
                id={Rating.VERY_GOOD}
                type="radio"
                value={Rating.VERY_GOOD}
              />
            </RadioZedStack>
          </Box>
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
