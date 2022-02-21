import { X } from "react-feather";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  IconButton,
  Input,
  keyframes,
  Spacer,
  styled,
  VerticalStack,
  VisuallyHidden,
} from "ui";
import { deleteAccount } from "../api";
import { Field } from "../form/Field";
import { FieldLabel } from "../form/FieldLabel";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const Overlay = styled(DialogOverlay, {
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(2px)",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const Content = styled(DialogContent, {
  backgroundColor: "inherit",
  borderRadius: "$large",
  boxShadow: `
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.017),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.022),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.026),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.032),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.041),
    100px 100px 80px rgba(0, 0, 0, 0.07)
  `,
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

interface DeleteAccountSchema {
  confirm: string;
}

export const DeleteAccountDialog: React.FC = ({ children }) => {
  const { register, handleSubmit, reset } = useForm<DeleteAccountSchema>({
    defaultValues: {
      confirm: "",
    },
  });

  const submit = async (data: DeleteAccountSchema) => {
    await deleteAccount(data.confirm.toUpperCase());
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <Overlay />
        <Content>
          <VerticalStack size="$2">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Thank you for using Cffee! Once ready, type &quot;delete&quot; and
              submit.
            </DialogDescription>
          </VerticalStack>

          <Spacer size="3" />

          <form onSubmit={handleSubmit(submit)}>
            <VerticalStack size="$2">
              <Field>
                <FieldLabel htmlFor="app-feedback">
                  <VisuallyHidden>Confirm account delete</VisuallyHidden>
                </FieldLabel>
                <Input
                  id="app-feedback"
                  placeholder='Type "delete"'
                  {...register("confirm", {
                    required: true,
                    validate: (v) => v.toUpperCase() === "DELETE",
                  })}
                />
              </Field>

              <Button type="submit">Submit</Button>
            </VerticalStack>
          </form>

          <DialogClose asChild>
            <IconButton
              type="button"
              css={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              <X />
            </IconButton>
          </DialogClose>
        </Content>
      </DialogPortal>
    </Dialog>
  );
};
