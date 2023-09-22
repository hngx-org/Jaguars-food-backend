import joi from "joi";
import { sendEmail } from "../utils/sendMail.js";
import asyncHandler from "express-async-handler";
import express from "express";
import dotenv from "dotenv";
import { invites, organization } from "../models/organization.model.js";
import { getInviteTemplate } from "../utils/emailTemplate.js";

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
      const org = await organization.findOne({ where: { id: 3 } });
      const ORGANIZATION = org.dataValues;
      const invite = await invites.create({
        email,
        token: OTP,
        ttl: new Date(),
        org_id: ORGANIZATION.id,
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

      res.status(200).json({ message: "email sent successfully" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

router.post(`/api/organizations/invite`, createInvite);

export { createInvite, createAdmin, router };

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
