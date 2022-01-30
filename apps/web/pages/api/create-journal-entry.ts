import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";
import { authenticated } from "../../middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const data = JSON.parse(req.body);

  const isHotUpdatingBeans =
    !data.bean || Object.values(data.bean).some(Boolean);

  if (isHotUpdatingBeans) {
    const bean = await db.bean.create({
      data: {
        roaster: data?.bean?.roaster,
        roast: data?.bean?.roast,
        singleOrigin: data?.bean?.singleOrigin,
        state: data?.bean?.state,
        countryCode: data?.bean?.countryCode,
        rating: data?.bean?.rating,
      },
    });

    const entry = await db.journal.create({
      data: {
        userId: user?.id!,
        beanId: bean.id,
        brewMethod: data.brewMethod,
        grinder: data.grinder,
        grindDescription: data.grindDescription,
        waterTemperatureFahrenheit: data.waterTemperatureFahrenheit,
        rating: data.rating,
        note: data.note,
      },
    });

    return res.status(200).json(entry);
  } else {
    const entry = await db.journal.create({
      data: {
        userId: user?.id!,
        beanId: data.beanId,
        brewMethod: data.brewMethod,
        grinder: data.grinder,
        grindDescription: data.grindDescription,
        waterTemperatureFahrenheit: data.waterTemperatureFahrenheit,
        rating: data.rating,
        note: data.note,
      },
    });

    return res.status(200).json(entry);
  }
};

export default handler;
