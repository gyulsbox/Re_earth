import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    if (profile) {
      res.json({
        ok: true,
        profile,
      });
    } else {
      res.json({
        ok: false,
      });
    }
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name, password, avatarId },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: { id: true },
        }),
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "Email already taken.",
        });
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            email,
          },
        });
        return res.json({
          ok: true,
        });
      }
    }
    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: { id: true },
        }),
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "Phone number already taken.",
        });
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            phone,
          },
        });
        return res.json({
          ok: true,
        });
      }
    }
    if (name && name !== currentUser?.name) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            name,
          },
          select: { id: true },
        }),
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "Nick name already taken.",
        });
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            name,
          },
        });
      }
    }
    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }
    if (password) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          password,
        },
      });
    }
    return res.json({
      ok: true,
    });
  }
}

export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  }),
);
