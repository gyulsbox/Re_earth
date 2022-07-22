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
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id!.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      comments: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
          empathy: true,
        },
      },
    },
  });
  const isEmpathy = Boolean(
    await client.empathy.findFirst({
      where: {
        postId: +id!.toString(),
        userId: user?.id,
      },
    }),
  );
  if (!post) {
    res.status(404).json({
      ok: false,
      error: "해당 게시글은 존재하지 않습니다.",
    });
  } else {
    res.json({
      ok: true,
      post,
      isEmpathy,
    });
  }
}

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  }),
);
