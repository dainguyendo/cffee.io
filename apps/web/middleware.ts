import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export async function authenticated(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  return session!;
}
