import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";
import { authenticated } from "../../middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const { confirm } = req.body;

  if (confirm === "DELETE") {
    await db.user.delete({
      where: {
        id: user?.id,
      },
    });

    res.status(301).redirect("/");
  } else {
    res.status(400).json({
      deleted: false,
    });
  }
};

export default handler;
