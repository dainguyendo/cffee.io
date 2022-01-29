import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, styled, VisuallyHidden } from "ui";
import type { BeanFormData } from "types";
import { createBean, useSetup } from "../api";
import { ZedStack } from "./ZedStack";
import { Rating } from "db";
import { RadioZedStack } from "./RadioZedStack";

export const BeanForm = () => {
  const { data, refetch } = useSetup();

  const { register, handleSubmit, reset, watch } = useForm<BeanFormData>({
    defaultValues: {
      roaster: data?.bean?.roaster ?? "",
      roast: data?.bean?.roast ?? "",
      singleOrigin: data?.bean?.singleOrigin ?? false,
      state: data?.bean?.state ?? "",
      countryCode: data?.bean?.countryCode ?? "",
      rating: data?.bean?.rating ?? "AVERAGE",
    },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        roaster: data?.bean?.roaster ?? "",
        roast: data?.bean?.roast ?? "",
        singleOrigin: data?.bean?.singleOrigin ?? false,
        state: data?.bean?.state ?? "",
        countryCode: data?.bean?.countryCode ?? "",
        rating: data?.bean?.rating ?? "AVERAGE",
      });
    }
  }, [data, reset]);

  async function submit(data: BeanFormData) {
    const bean = await createBean(data);
    reset({
      roast: bean.roast,
      roaster: bean.roaster,
      rating: bean.rating,
      singleOrigin: bean.singleOrigin,
      countryCode: bean.countryCode,
      state: bean.state ?? "",
    });
    refetch();
  }

  const rating = watch("rating");

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box css={{ display: "flex", fd: "column" }}>
        <label htmlFor="roast">Roast</label>
        <input {...register("roast")} />
        <label htmlFor="roaster">Roaster</label>
        <input {...register("roaster")} />
        <label htmlFor="roast">Single origin?</label>
        <input type="checkbox" {...register("singleOrigin")} />
        <label htmlFor="roast">State</label>
        <input {...register("state")} />
        <label htmlFor="roast">Country</label>
        <input {...register("countryCode")} />
        <label htmlFor="roast">General feelings for the bean</label>

        <Box css={{ display: "flex" }}>
          <RadioZedStack selected={rating === Rating.VERY_BAD}>
            <label htmlFor={Rating.VERY_BAD}>
              🤮
              <VisuallyHidden>{Rating.VERY_BAD}</VisuallyHidden>
            </label>
            <Input
              {...register("rating")}
              id={Rating.VERY_BAD}
              type="radio"
              value={Rating.VERY_BAD}
            />
          </RadioZedStack>

          <RadioZedStack selected={rating === Rating.BAD}>
            <label htmlFor={Rating.BAD}>
              🙁
              <VisuallyHidden>{Rating.BAD}</VisuallyHidden>
            </label>
            <Input
              {...register("rating")}
              id={Rating.BAD}
              type="radio"
              value={Rating.BAD}
            />
          </RadioZedStack>

          <RadioZedStack selected={rating === Rating.AVERAGE}>
            <label htmlFor={Rating.AVERAGE}>
              😐
              <VisuallyHidden>{Rating.AVERAGE}</VisuallyHidden>
            </label>
            <Input
              {...register("rating")}
              id={Rating.AVERAGE}
              type="radio"
              value={Rating.AVERAGE}
            />
          </RadioZedStack>

          <RadioZedStack selected={rating === Rating.GOOD}>
            <label htmlFor={Rating.GOOD}>
              🙂
              <VisuallyHidden>{Rating.GOOD}</VisuallyHidden>
            </label>
            <Input
              {...register("rating")}
              id={Rating.GOOD}
              type="radio"
              value={Rating.GOOD}
            />
          </RadioZedStack>

          <RadioZedStack selected={rating === Rating.VERY_GOOD}>
            <label htmlFor={Rating.VERY_GOOD}>
              😍
              <VisuallyHidden>{Rating.VERY_GOOD}</VisuallyHidden>
            </label>
            <Input
              {...register("rating")}
              id={Rating.VERY_GOOD}
              type="radio"
              value={Rating.VERY_GOOD}
            />
          </RadioZedStack>
        </Box>

        <Button type="submit">Update</Button>
      </Box>
    </form>
  );
};

const Input = styled("input", {
  appearance: "none",
});
