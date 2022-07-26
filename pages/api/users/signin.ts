import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ ok: false });

  const checkUser = await client.user.findUnique({ where: { username } });

  if (!checkUser) return res.status(404).end();

  if (checkUser && checkUser.password === password) {
    req.session.user = {
      id: checkUser.id,
    };
    await req.session.save();
    console.log(checkUser);
    return res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ method: ["POST"], handler, isPrivate: false }),
);
