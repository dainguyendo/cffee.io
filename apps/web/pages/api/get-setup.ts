import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";
import { authenticated } from "../../middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const setup = await db.setup.findFirst({
    include: {
      bean: true,
    },
    where: {
      userId: user?.id,
    },
  });

  res.status(200).json(setup);
};

export default handler;
