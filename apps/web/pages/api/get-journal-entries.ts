import { format } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";
import { authenticated } from "../../middleware";

const DEFAULT_LIMIT = 4;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await authenticated(req, res);

  const page = isNaN(Number(req.query.page)) ? 0 : Number(req.query.page);
  const limit: number = isNaN(Number(req.query.limit))
    ? DEFAULT_LIMIT
    : Number(req.query.limit);

  const userJournalCount = await db.journal.count({
    where: {
      userId: user?.id,
    },
  });

  const entries = await db.journal.findMany({
    skip: limit * page,
    take: limit,

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

  res.status(200).json({
    page: grouped,
    pagination: {
      total: userJournalCount,
      pageCount: Math.ceil(userJournalCount / limit),
      currentPage: page,
      perPage: limit,
      from: page * limit + 1,
      to: page * limit + entries.length,
    },
  });
};

export default handler;
