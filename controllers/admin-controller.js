const joi =require("joi");
const { sendEmail } = require("../utils/sendMail.js");
const asyncHandler  = require("express-async-handler");
const express = require("express");
const dotenv = require("dotenv");
const { invites, organization } = require("../models/organization.model.js");
const { getInviteTemplate } = require("../utils/emailTemplate.js");
const { User } = require("../models/user.model.js");

const router = express.Router();
dotenv.config();

const createAdmin = asyncHandler(async (req, res) => {});

const createInvite = asyncHandler(async (req, res) => {
  try {
    if (!req?.body?.email) {
      res.status(400);
      throw new Error("email is required");
    }
    const { email } = req.body;

    if (typeof email === "string") {
      const { error, value } = joi
        .string()
        .email({ minDomainSegments: 2 })
        .required()
        .validate(email);

      if (error) {
        res.status(400);
        throw new Error(error);
      }
      const OTP = generateOtp();
      // extract id from req.user
      const { id } = req.user;
      // find user and extract org_id
      const user = await User.findOne({ where: { id } });
      const org_id = user.dataValues.org_id || 3;
      // find organization
      const org = await organization.findOne({ where: { id: org_id } });
      const ORGANIZATION = org.dataValues;

      // I can't create the invite
      // Please help out
      const invite = await invites.create({
        email,
        token: OTP,
        ttl: new Date(),
        org_id,
      });

      if (!invite) {
        res.status(500);
        throw new Error("Invite not sent!");
      }

      // send email
      const details = {
        from: `${ORGANIZATION.name} <${ORGANIZATION?.email}>`,
        to: email,
        subject: `Invitation to ${ORGANIZATION.name} Lunch platform`,
        html: getInviteTemplate(
          OTP,
          ORGANIZATION.name,
          `Join ${ORGANIZATION.name} free lunch app`
        ),
      };

      await sendEmail(details);

      res.status(200).json({ message: "email sent successfully", USER });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

router.post(`/api/organizations/invite`, createInvite);

module.exports = { createInvite, createAdmin, router };

const generateOtp = () => {
  let otp = "";
  const random = (range) => Math.floor(Math.random() * (range + 1));
  const getArr = () => {
    let date = new Date().valueOf().toPrecision(15).split("");
    if (date.includes(".")) {
      date.splice(date.indexOf("."), 1);
    }
    return date;
  };
  const strArr = getArr();
  for (let index = 0; index < 6; index++) {
    otp += strArr[random(strArr.length - 1)];
  }
  return otp;
};
