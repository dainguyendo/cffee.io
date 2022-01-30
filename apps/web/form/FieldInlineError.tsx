import { Text } from "ui";
import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

type Props<FormValues> = UseControllerProps<FormValues>;

export function FieldInlineError<FormValues extends FieldValues = object>({
  name,
  control,
}: Props<FormValues>): JSX.Element | null {
  const { fieldState, formState } = useController({ name, control });

  if ((formState.isSubmitted || fieldState.isTouched) && fieldState.invalid) {
    return (
      <Text
        id={`${name}-field-error`}
        className="loom-form-inline-error"
        color="red"
      >
        {fieldState.error && fieldState.error.message}
      </Text>
    );
  }

  return null;
}
