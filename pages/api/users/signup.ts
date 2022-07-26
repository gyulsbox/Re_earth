import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { email, name, username, password } = req.body;

  if (!email && !name && !username && !password)
    return res.status(400).json({ ok: false });

  const checkUserName = await client.user.findUnique({
    where: {
      username,
    },
  });

  const checkEmail = await client.user.findUnique({
    where: {
      email,
    },
  });

  const checkName = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (checkUserName || checkEmail || checkName) {
    return res.status(400).json({ ok: false });
  } else {
    const registe = await client.user.create({
      data: {
        name,
        username,
        password,
        email,
      },
    });
    return res.json({
      ok: true,
      registe,
    });
  }
}

export default withHandler({ method: ["POST"], handler, isPrivate: false });
