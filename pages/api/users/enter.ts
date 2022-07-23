import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import smtpTransport from "@libs/server/email";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}`,
    });
    console.log(message);
  } else if (email) {
    const mailOptions = {
      from: {
        name: "Re:earth",
        address: process.env.MAIL_ID!,
      },
      replyTo: email,
      to: email,
      subject: "Re:Earth Verification Code ",
      text: `Hello! Your Authentication Code : ${payload}`,
    };

    await new Promise((resolve, reject) => {
      // verify connection configuration
      smtpTransport.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    await new Promise((resolve, reject) => {
      // send mail
      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
    smtpTransport.close();
  }
  return res.json({
    ok: true,
    payload,
  });
}

export default withHandler({ method: ["POST"], handler, isPrivate: false });
