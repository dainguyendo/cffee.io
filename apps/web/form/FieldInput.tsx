import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import { wrapEvent } from "./helpers/wrapEvent";

interface Props<FormValues> extends UseControllerProps<FormValues> {
  id: string;
}

export function FieldInput<FormValues extends FieldValues = object>({
  ...props
}: Props<FormValues>): JSX.Element {
  const {
    control,
    rules,
    shouldUnregister,
    defaultValue,
    name,
    ...inputProps
  } = props;

  const { field, fieldState, formState } = useController({
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
  });

  const showError =
    Boolean(fieldState.error) &&
    (fieldState.isTouched || formState.isSubmitted);

  return (
    <input
      {...field}
      {...inputProps}
      aria-invalid={fieldState.invalid ? "true" : "false"}
      aria-describedby={`${name}-field-error`}
      onChange={wrapEvent(inputProps.onChange, field.onChange)}
      onBlur={wrapEvent(inputProps.onBlur, field.onBlur)}
    />
  );
}
