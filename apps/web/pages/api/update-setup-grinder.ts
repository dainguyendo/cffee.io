import type { NextApiRequest, NextApiResponse } from "next";
import { GrinderFormData } from "types";
import db from "../../db";
import { authenticated } from "../../middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const data: GrinderFormData = JSON.parse(req.body);

  const setup = await db.setup.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (!setup) {
    const resource = await db.setup.create({
      data: {
        userId: user?.id ?? "",
        default: false,
        brewMethod: "AEROPRESS",
        grinder: data.grinder,
      },
    });
    res.status(200).json(resource);
  } else {
    const resource = await db.setup.update({
      data: {
        grinder: data.grinder,
      },
      where: {
        id: setup.id,
      },
    });
    res.status(200).json(resource);
  }
};

export default handler;
