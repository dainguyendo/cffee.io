import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import { wrapEvent } from "./helpers/wrapEvent";

type SelectProps = Omit<
  React.HTMLAttributes<HTMLSelectElement>,
  "defaultValue"
>;

interface Props<FormValues>
  extends UseControllerProps<FormValues>,
    SelectProps {
  children: React.ReactNode;
}
1;
export function FieldSelect<FormValues extends FieldValues = object>({
  children,
  ...props
}: Props<FormValues>): JSX.Element {
  const {
    control,
    rules,
    shouldUnregister,
    defaultValue,
    name,
    ...selectProps
  } = props;
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
  });

  return (
    <select
      {...selectProps}
      aria-invalid={fieldState.invalid ? "true" : "false"}
      aria-describedby={`${name}-field-error`}
      onChange={(selected) => {
        wrapEvent(selectProps.onChange, field.onChange)(selected);
      }}
    >
      {children}
    </select>
  );
}
