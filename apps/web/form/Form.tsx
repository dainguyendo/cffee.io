import React from "react";
import type { FieldValues, UseFormStateProps } from "react-hook-form";
import { useFormState } from "react-hook-form";
import { usePrevious } from "./helpers/usePrevious";

type Props<FormValues> = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> &
  UseFormStateProps<FormValues>;

export function Form<FormValues extends FieldValues = object>({
  children,
  control,
  ...props
}: Props<FormValues>): JSX.Element {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const { isSubmitting, isValidating, isValid } = useFormState({ control });

  const previouslyValidating = usePrevious(isValidating);
  const previouslySubmitting = usePrevious(isSubmitting);

  React.useEffect(() => {
    if (previouslySubmitting && !previouslyValidating && !isValid) {
      const form = formRef.current;

      if (form) {
        const invalidControl = form.querySelector(
          '[aria-invalid="true"]'
        ) as HTMLElement | null;

        if (invalidControl) {
          if (invalidControl.scrollIntoView) {
            invalidControl.scrollIntoView({ behavior: "smooth" });
          }

          invalidControl.focus();
        }
      }
    }
  }, [previouslySubmitting, previouslyValidating, isValid]);

  return (
    <form ref={formRef} {...props}>
      {children}
    </form>
  );
}
