import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  try {
    const config = {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport(config);
    transporter
      .sendMail(data)
      .then((info) => {
        return info.response;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};
