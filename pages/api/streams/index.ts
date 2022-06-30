import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    session: { user },
    body: { title, price, description },
  } = req;
  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        title,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  }
  if (req.method === "GET") {
		let page =
			req.query.page && req.query.page !== undefined
				? +req.query?.page?.toString()
				: 1;
		let skip: number = (page - 1) * 10;
		if (!skip) {
			skip = 1;
		}

		const rowCnt = await client.stream.count({
			select: {
				_all: true,
			},
		});
		const streams = await client.stream.findMany({
			take: 10,
			skip,
			orderBy: {
				createdAt: "desc",
			},
		});
  res.json({ ok: true, streams, rowCnt })
}

export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  }),
);
