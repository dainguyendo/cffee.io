import { Rating } from "db";
import React from "react";
import { useForm } from "react-hook-form";
import type { BeanFormData } from "types";
import { Box, Button, Flex, RadioGroup } from "ui";
import { createBean, useSetup } from "../api";
import { EmojiIndicator, EmojiRadio } from "./EmojiRadio";

export const BeanForm = () => {
  const { data, refetch } = useSetup();

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<BeanFormData>({
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
        <Flex>
          <RadioGroup
            value={rating ?? ""}
            onValueChange={(value) => setValue("rating", (value as Rating)!)}
            css={{ display: "flex", gap: "$1" }}
          >
            <EmojiRadio id="rating-very-bad" value={Rating.VERY_BAD}>
              <EmojiIndicator>😢</EmojiIndicator>
              <label htmlFor="rating-very-bad">😢</label>
            </EmojiRadio>

            <EmojiRadio id="rating-bad" value={Rating.BAD}>
              <EmojiIndicator>🙁</EmojiIndicator>
              <label htmlFor="rating-bad">🙁</label>
            </EmojiRadio>
            <EmojiRadio id="rating-average" value={Rating.AVERAGE}>
              <EmojiIndicator>😐</EmojiIndicator>
              <label htmlFor="rating-average">😐</label>
            </EmojiRadio>
            <EmojiRadio id="rating-good" value={Rating.GOOD}>
              <EmojiIndicator>🙂</EmojiIndicator>
              <label htmlFor="rating-good">🙂</label>
            </EmojiRadio>
            <EmojiRadio id="rating-very-good" value={Rating.VERY_GOOD}>
              <EmojiIndicator>😍</EmojiIndicator>
              <label htmlFor="rating-very-good">😍</label>
            </EmojiRadio>
          </RadioGroup>
        </Flex>

        <Button type="submit">Update</Button>
      </Box>
    </form>
  );
};
