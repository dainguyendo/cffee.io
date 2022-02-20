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
  Input,
  keyframes,
  Spacer,
  styled,
  Textarea,
  VerticalStack,
  VisuallyHidden,
} from "ui";
import { postFeedback } from "../api";
import { Field } from "../form/Field";
import { FieldInput } from "../form/FieldInput";
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

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,
});

interface FeedbackSchema {
  description: string;
}

export const FeedbackDialog: React.FC = ({ children }) => {
  const { register, handleSubmit, reset } = useForm<FeedbackSchema>({
    defaultValues: {
      description: "",
    },
  });

  const submit = async (data: FeedbackSchema) => {
    await postFeedback(data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <Overlay />
        <Content>
          <VerticalStack size="$2">
            <DialogTitle>🙏 Leave feedback</DialogTitle>
            <DialogDescription>
              Thank you for using cffee! Cffee welcomes your feedback regarding
              your experience. Click submit when complete!
            </DialogDescription>
          </VerticalStack>

          <Spacer size="3" />

          <form onSubmit={handleSubmit(submit)}>
            <VerticalStack size="$2">
              <Field>
                <FieldLabel htmlFor="app-feedback">
                  <VisuallyHidden>Feedback</VisuallyHidden>
                </FieldLabel>
                <Textarea
                  id="app-feedback"
                  {...register("description", { required: true })}
                />
              </Field>

              <Button type="submit">Submit</Button>
            </VerticalStack>
          </form>

          <DialogClose asChild>
            <IconButton>
              <X />
            </IconButton>
          </DialogClose>
        </Content>
      </DialogPortal>
    </Dialog>
  );
};
