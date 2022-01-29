import db from "../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { BrewMethodFormData } from "types";
import { authenticated } from "../../middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const data: BrewMethodFormData = JSON.parse(req.body);

  const setup = await db.setup.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (!setup) {
    await db.setup.create({
      data: {
        userId: user?.id ?? "",
        default: false,
        brewMethod: data.brewMethod,
        grinder: "",
      },
    });
  } else {
    await db.setup.update({
      data: {
        brewMethod: data.brewMethod,
      },
      where: {
        id: setup.id,
      },
    });
  }

  res.status(200).json({
    brewMethod: data.brewMethod,
  });
};

export default handler;
