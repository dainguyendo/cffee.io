import { BrewMethod } from "db";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { BeanFormData } from "types";
import {
  Button,
  Flex,
  Input,
  Label,
  Select,
  Separator,
  Text,
  VerticalStack,
} from "ui";
import {
  createBean,
  updateBrewMethod,
  updateSetupGrinder,
  useSetup,
  UseSetupData,
} from "../api";
import { Field } from "../form/Field";
import { Page } from "../ui/Page";
import { useDebounce } from "../ui/useDebounce";
import { BREW_METHOD_TO_STRING } from "../utils/copy";

type Accordions = "method" | "grinder" | "bean";

export default function Equipment() {
  const queryClient = useQueryClient();
  const { data } = useSetup();

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

  const { register, reset, getValues, handleSubmit, formState } =
    useForm<BeanFormData>({
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

  return (
    <Page>
      <Text as="h1" variant="heading">
        Equipment
      </Text>
      <Separator css={{ my: "$4" }} />
      <section>
        <VerticalStack size="$4">
          <Text id="brew-method-label" as="h2" variant="heading">
            Brew method
          </Text>

          <Field>
            <Select
              aria-labelledby="brew-method-label"
              defaultValue={data?.brewMethod ?? undefined}
              onChange={(evt) => {
                mutate(evt.currentTarget.value as BrewMethod);
              }}
            >
              {Object.values(BrewMethod).map((value) => {
                return (
                  <option key={value} value={value}>
                    {BREW_METHOD_TO_STRING[value]}
                  </option>
                );
              })}
            </Select>
          </Field>
        </VerticalStack>
      </section>
      <Separator css={{ backgroundColor: "$secondary", my: "$6" }} />
      <section>
        <VerticalStack size="$4">
          <Text id="grinder-label" as="h2" variant="heading">
            Coffee grinder
          </Text>
          <Field>
            <Input
              id="equipment-grinder"
              aria-labelledby="grinder-label"
              placeholder="LAGOM mini"
              defaultValue={data?.grinder ?? undefined}
              onChange={(evt) => setGrinder(evt.currentTarget.value)}
            />
          </Field>
        </VerticalStack>
      </section>
      <Separator css={{ backgroundColor: "$secondary", my: "$6" }} />
      <section>
        <VerticalStack size="$4">
          <Text as="h2" variant="heading">
            Coffee beans
          </Text>
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

              <Button
                type="submit"
                disabled={!formState.isDirty || formState.isSubmitting}
              >
                Update
              </Button>
            </Flex>
          </form>
        </VerticalStack>
      </section>
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
