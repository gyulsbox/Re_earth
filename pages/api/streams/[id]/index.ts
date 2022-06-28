import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import Id from "../../posts/[id]";
import { TrustProductsChannelEndpointAssignmentContext } from "twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    query: { id },
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      streamMessages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  res.json({ ok: true, stream });
}

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  }),
);