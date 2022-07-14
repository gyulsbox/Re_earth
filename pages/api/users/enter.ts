import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import smtpTransport from "@libs/server/email";

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  const payload = Math.floor(100000 + Math.random() * 999999) + "";

  if (!user) return res.status(400).json({ ok: false });

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonimous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}`,
  //   });
  //   console.log(message);
  // } else if (email) {
  //   const mailOptions = {
  //     from: process.env.MAIL_ID,
  //     to: email,
  //     subject: "Re:Earth Verification Code ",
  //     text: `Hello! Your Authentication Code : ${payload}`,
  //   };
  //   const result = await smtpTransport.sendMail(
  //     mailOptions,
  //     (error, responses) => {
  //       if (error) {
  //         console.log(error);
  //         return null;
  //       } else {
  //         console.log(responses);
  //         return null;
  //       }
  //     },
  //   );
  //   smtpTransport.close();
  //   console.log(result);
  // }
  return res.json({
    ok: true,
    payload,
  });
}

export default withHandler({ method: ["POST"], handler, isPrivate: false });
