import nodemailer from "nodemailer";

const sendEmail = async (data, configObj) => {
  try {
    const config = {
      service: "gmail",
      auth: {
        user: configObj.user,
        pass: configObj.password,
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

module.exports = { sendEmail };
