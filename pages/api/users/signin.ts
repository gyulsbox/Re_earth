import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

interface LoginForm {
  username: string;
  password: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { username, password }: LoginForm = req.body;

  if (!username || !password) return res.status(400).json({ ok: false });

  const checkUser = await client.user.findFirst({
    where: {
      username,
      password,
    },
  });

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
