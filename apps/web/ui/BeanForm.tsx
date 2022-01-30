import React from "react";
import { useForm } from "react-hook-form";
import type { BeanFormData } from "types";
import { Box, Button, Flex } from "ui";
import { createBean, useSetup } from "../api";
import { EmojiRating } from "./EmojiRating";

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
          <EmojiRating
            rating={rating}
            onRatingChanged={(value) => setValue("rating", value)}
          />
        </Flex>

        <Button type="submit">Update</Button>
      </Box>
    </form>
  );
};
