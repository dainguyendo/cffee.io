import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

type RadioProps = React.HTMLProps<HTMLInputElement>;

interface Props<FormValues> extends UseControllerProps<FormValues> {
  id: string;
  value: RadioProps["value"];
}

export function FieldRadio<FormValues extends FieldValues = object>({
  name,
  control,
  value,
}: Props<FormValues>): JSX.Element {
  const { field } = useController({ name, control });

  return (
    <input
      type="radio"
      {...field}
      value={value}
      checked={Boolean(field.value === value)}
      aria-describedby={`${name}-field-error`}
    />
  );
}
