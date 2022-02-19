import { BrewMethod } from "db";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { BeanFormData } from "types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Flex,
  Input,
  Label,
} from "ui";
import {
  createBean,
  updateBrewMethod,
  updateSetupGrinder,
  useSetup,
  UseSetupData,
} from "../api";
import { Field } from "../form/Field";
import { FieldGroupRow } from "../form/FieldGroupRow";
import { BrewMethodFields } from "../ui/BrewMethodFields";
import { Page } from "../ui/Page";
import { useDebounce } from "../ui/useDebounce";

type Accordions = "method" | "grinder" | "bean";

export default function Equipment() {
  const queryClient = useQueryClient();
  const { data } = useSetup();

  const [expanded, expand] = React.useState<Accordions | undefined>();

  const [grinder, setGrinder] = React.useState<string>(data?.grinder ?? "");
  const debouncedGrinder: string = useDebounce<string>(grinder, 500);

  const { mutate: updateGrinder } = useMutation((value: string) => {
    return updateSetupGrinder({ grinder: value });
  });

  React.useEffect(() => {
    if (debouncedGrinder) {
      updateGrinder(debouncedGrinder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedGrinder]);

  const { mutate } = useMutation(
    (brewMethod: BrewMethod) => {
      return updateBrewMethod({ brewMethod });
    },
    {
      onMutate: async (brewMethod) => {
        await queryClient.cancelQueries("use-setup");
        const previous = queryClient.getQueryData<UseSetupData>("use-setup");
        queryClient.setQueryData<UseSetupData>("use-setup", (old) =>
          old ? { ...old, brewMethod } : null
        );
        return { previous };
      },
      onError: (err, brewMethod, context: any) => {
        queryClient.setQueryData<UseSetupData>("use-setup", context?.previous);
      },
      onSettled: () => {
        queryClient.invalidateQueries("use-setup");
      },
    }
  );

  const {
    register,
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState,
  } = useForm<BeanFormData>({
    defaultValues: {
      roast: "",
      roaster: "",
      singleOrigin: false,
      state: "",
      countryCode: "",
      rating: null,
    },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        roast: data.bean?.roast ?? "",
        roaster: data.bean?.roaster ?? "",
        singleOrigin: data.bean?.singleOrigin ?? false,
        state: data.bean?.state ?? "",
        countryCode: data.bean?.countryCode ?? "",
        rating: data.bean?.rating ?? null,
      });
    }
  }, [data, reset, getValues]);

  const submit = async (data: BeanFormData) => {
    await createBean(data);
  };

  const toggle = (accordion: Accordions) => {
    if (accordion === expanded) {
      expand(undefined);
      return;
    }

    expand(accordion);
  };

  return (
    <Page>
      <Accordion
        type="single"
        value={expanded}
        onValueChange={toggle}
        collapsible
      >
        <AccordionItem value="method">
          <AccordionTrigger>Brew method</AccordionTrigger>
          <AccordionContent>
            <BrewMethodFields
              selected={data?.brewMethod ?? null}
              onBrewMethodChanged={mutate}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="grinder">
          <AccordionTrigger>Grinder</AccordionTrigger>
          <AccordionContent>
            <Field>
              <Label htmlFor="equipment-grinder">Grinder</Label>
              <Input
                id="equipment-grinder"
                placeholder="LAGOM mini"
                defaultValue={data?.grinder ?? undefined}
                onChange={(evt) => setGrinder(evt.currentTarget.value)}
              />
            </Field>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bean">
          <AccordionTrigger>Coffee beans</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleSubmit(submit)}>
              <Flex direction="column" css={{ gap: "$4" }}>
                <Field>
                  <Label htmlFor="roast">Roast</Label>
                  <Input {...register("roast")} />
                </Field>
                <Field>
                  <Label htmlFor="roaster">Roaster</Label>
                  <Input {...register("roaster")} />
                </Field>
                <Field variant="row">
                  <Input type="checkbox" {...register("singleOrigin")} />
                  <Label htmlFor="roast">Single origin?</Label>
                </Field>
                <FieldGroupRow>
                  <Field>
                    <Label htmlFor="roast">State</Label>
                    <Input {...register("state")} />
                  </Field>
                  <Field>
                    <Label htmlFor="roast">Country</Label>
                    <Input {...register("countryCode")} />
                  </Field>
                </FieldGroupRow>

                <Button
                  type="submit"
                  disabled={!formState.isDirty || formState.isSubmitting}
                >
                  Update
                </Button>
              </Flex>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
