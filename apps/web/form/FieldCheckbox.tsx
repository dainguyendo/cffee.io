import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

interface Props<FormValues> extends UseControllerProps<FormValues> {
  id: string;
}

export function FieldCheckbox<FormValues extends FieldValues = object>(
  props: Props<FormValues>
): JSX.Element {
  const { control, rules, shouldUnregister, defaultValue, name, ...rest } =
    props;

  const { ...checkboxProps } = rest;

  const ref = React.useRef(null);
  const [checked, setChecked] = React.useState<boolean>(
    control && typeof defaultValue === "boolean" ? defaultValue : false
  );
  const [indeterminate, setIndeterminate] = React.useState<boolean | undefined>(
    control && (defaultValue === undefined || defaultValue === null)
      ? true
      : false
  );

  const { field } = useController({
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
  });

  return (
    <input
      type="checkbox"
      {...field}
      {...checkboxProps}
      ref={ref}
      aria-describedby={`${name}-field-error`}
      checked={Boolean(field.value)}
      onChange={() => {
        setChecked(!checked);
        field.onChange(!checked);
      }}
    />
  );
}
