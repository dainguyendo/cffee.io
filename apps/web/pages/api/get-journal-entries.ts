import { format } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";
import { authenticated } from "../../middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const entries = await db.journal.findMany({
    select: {
      id: true,
      updatedAt: true,
      brewMethod: true,
      rating: true,
      grinder: true,
      grindDescription: true,
      waterTemperatureFahrenheit: true,
      note: true,
      bean: {
        select: {
          roast: true,
          roaster: true,
        },
      },
    },
    where: {
      userId: user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  interface GroupByDate {
    [key: string]: typeof entries;
  }

  const grouped = entries.reduce<GroupByDate>((prev, entry) => {
    const date = entry.updatedAt;
    const key = format(new Date(date), "MMddyyyy");

    if (prev[key]) {
      prev[key].push(entry);
    } else {
      prev[key] = [entry];
    }

    return prev;
  }, {});

  res.status(200).json(grouped);
};

export default handler;
