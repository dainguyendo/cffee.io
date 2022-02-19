import db from "../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { FeedbackFormData } from "types";
import { authenticated } from "../../middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const data: FeedbackFormData = JSON.parse(req.body);

  const feedback = await db.feedback.create({
    data: {
      userId: user?.id!,
      description: data.description,
    },
  });

  res.status(200).json({ id: feedback.id });
};

export default handler;
