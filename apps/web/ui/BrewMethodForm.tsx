import { BrewMethod } from "db";
import React from "react";
import { useForm } from "react-hook-form";
import { BrewMethodFormData } from "types";
import { Box, Button } from "ui";
import { updateBrewMethod, useSetup } from "../api";

export const BrewMethodForm = () => {
  const { data, refetch } = useSetup();

  const { register, handleSubmit, reset } = useForm<BrewMethodFormData>({
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

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box css={{ display: "flex", fd: "column" }}>
        <label htmlFor="brewMethod">Brew method</label>
        <select {...register("brewMethod")}>
          <option value={BrewMethod.AEROPRESS}>Aeropress</option>
          <option value={BrewMethod.BIALETTI}>Bialetti</option>
          <option value={BrewMethod.COLD_BREW}>Cold Brew</option>
          <option value={BrewMethod.ESPRESSO}>Espresso</option>
          <option value={BrewMethod.FRENCH_PRESS}>French Press</option>
          <option value={BrewMethod.PHIN}>Phin</option>
          <option value={BrewMethod.POUR_OVER}>Pour over</option>
          <option value={BrewMethod.SIPHON}>Siphon</option>
        </select>

        <Button type="submit">Update</Button>
      </Box>
    </form>
  );
};
