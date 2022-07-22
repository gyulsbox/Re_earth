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
    session: { user },
    body: { comment },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id!.toString(),
    },
    select: {
      id: true,
    },
  });

  const newComment = await client.comment.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id!.toString(),
        },
      },
      comment,
    },
  });
  if (!post) {
    res.status(404).json({
      ok: false,
      error: "해당 게시글은 존재하지 않습니다.",
    });
  } else {
    res.json({
      ok: true,
      comment: newComment,
    });
  }
}

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  }),
);
