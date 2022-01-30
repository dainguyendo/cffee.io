import { BrewMethod } from "db";
import React from "react";
import { useForm } from "react-hook-form";
import { BrewMethodFormData } from "types";
import { Box, Button } from "ui";
import { updateBrewMethod, useSetup } from "../api";
import { BrewMethodFields } from "./BrewMethodFields";

export const BrewMethodForm = () => {
  const { data, refetch } = useSetup();

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<BrewMethodFormData>({
      defaultValues: {
        brewMethod: data?.brewMethod ?? "POUR_OVER",
      },
    });

  React.useEffect(() => {
    if (data) {
      reset({
        brewMethod: data?.brewMethod ?? "POUR_OVER",
      });
    }
  }, [data, reset]);

  async function submit(data: BrewMethodFormData) {
    const { brewMethod } = await updateBrewMethod(data);
    reset({
      brewMethod: brewMethod ?? "AEROPRESS",
    });
    refetch();
  }

  const brewMethod = watch("brewMethod");

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box css={{ display: "flex", fd: "column" }}>
        <BrewMethodFields
          selected={brewMethod}
          onBrewMethodChanged={(m) => setValue("brewMethod", m)}
        />

        <Button type="submit">Update</Button>
      </Box>
    </form>
  );
};
