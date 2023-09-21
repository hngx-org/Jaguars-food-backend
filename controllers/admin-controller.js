import joi from "joi";
import asyncHandler from "express-async-handler";
import { sendMail } from "../utils/sendMail";

//Admin or organization

const createAdmin = asyncHandler(async (req, res) => {});

const createInvite = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400);
      throw new Error("email is required");
    }

    if (typeof email === "string") {
      const { error, value } = joi
        .string()
        .email({ minDomainSegments: 2 })
        .required()
        .validate();

      if (error) {
        res.status(400);
        throw new Error(error);
      }
      //  handle sending invite
      const details = {
        from: "TEAM NAME <christianchisom278@gmail.com>",
        to: email,
        subject: "Organization Invite",
        text: "test",
      };

      await sendMail(details, {
        user: "christianezeanyaeche@gmail.com",
        password: "dudelycodez@1",
      });

      res.status(200).json({ message: "email sent successfully" });
    }

    // if (typeof email === "object" && Array.isArray(email)) {
    //   const emailArraySchema = joi
    //     .array()
    //     .items(joi.string().email({ minDomainSegments: 2 }).required());

    //   const { error, value } = emailArraySchema.validate();

    //   if (error) {
    //     res.status(400);
    //     throw new Error(error);
    //   }
    //   //  handle sending multiple invites
    // }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export { createInvite, createAdmin };
