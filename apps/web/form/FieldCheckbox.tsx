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

  const { isIndeterminate, ...checkboxProps } = rest;

  const ref = React.useRef(null);
  const [checked, setChecked] = React.useState<boolean>(
    control && typeof defaultValue === "boolean" ? defaultValue : false
  );
  const [indeterminate, setIndeterminate] = React.useState<boolean | undefined>(
    control &&
      isIndeterminate &&
      (defaultValue === undefined || defaultValue === null)
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
        if (isIndeterminate) {
          // Handle change steps:
          // true => null (indeterminate) => false => true
          if (checked) {
            setChecked(false);
            setIndeterminate(true);
            field.onChange(null);
          } else if (indeterminate) {
            setChecked(false);
            setIndeterminate(false);
            field.onChange(false);
          } else {
            setChecked(true);
            setIndeterminate(false);
            field.onChange(true);
          }
        } else {
          setChecked(!checked);
          field.onChange(!checked);
        }
      }}
    />
  );
}
