import { BrewMethod } from "db";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { BrewMethodFormData, GrinderFormData } from "types";

export type Props = {
  register: UseFormRegister<GrinderFormData>;
};

export const GrinderFields = ({ register }: Props) => {
  return (
    <>
      <label htmlFor="grinder">Grinder</label>
      <input {...register("grinder")} />
    </>
  );
};
