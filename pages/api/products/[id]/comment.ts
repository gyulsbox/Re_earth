import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    query: { id },
  } = req;
  const chats = await client.chat.count({
    where: {
      productId: +id.toString(),
    },
  });
  await client.product.update({
    where: {
      id: +id.toString(),
    },
    data: {
      commentsCount: chats,
    },
  });
}

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  }),
);
