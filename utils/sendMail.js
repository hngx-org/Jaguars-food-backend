import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  try {
    const config = {
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "39a62ad9bbc926",
        pass: "4ea5383e8f255c",
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
