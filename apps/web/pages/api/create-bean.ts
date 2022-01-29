import db from "../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { BeanFormData } from "types";
import { authenticated } from "../../middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const data: BeanFormData = JSON.parse(req.body);

  const bean = await db.bean.create({
    data: {
      roaster: data.roaster,
      roast: data.roast,
      singleOrigin: data.singleOrigin,
      state: data.state,
      countryCode: data.countryCode,
      rating: data.rating,
    },
  });

  const setup = await db.setup.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (!setup) {
    await db.setup.create({
      data: {
        userId: user?.id ?? "",
        beanId: bean.id,
        default: false,
        brewMethod: "AEROPRESS",
        grinder: "",
      },
    });
  } else {
    await db.setup.update({
      data: {
        beanId: bean.id,
      },
      where: {
        id: setup.id,
      },
    });
  }

  res.status(200).json(bean);
};

export default handler;
