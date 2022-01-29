import React from "react";
import { useForm } from "react-hook-form";
import { GrinderFormData } from "types";
import { Box, Button } from "ui";
import { updateSetupGrinder, useSetup } from "../api";

export const GrinderForm = () => {
  const { data, refetch } = useSetup();

  const { register, handleSubmit, reset } = useForm<GrinderFormData>({
    defaultValues: {
      grinder: data?.grinder ?? "",
    },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        grinder: data?.grinder ?? "",
      });
    }
  }, [data, reset]);

  async function submit(data: GrinderFormData) {
    const setup = await updateSetupGrinder(data);
    reset({
      grinder: setup.grinder ?? "",
    });
    refetch();
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box css={{ display: "flex", fd: "column" }}>
        <label htmlFor="grinder">Grinder</label>
        <input {...register("grinder")} />
        <Button type="submit">Update</Button>
      </Box>
    </form>
  );
};
