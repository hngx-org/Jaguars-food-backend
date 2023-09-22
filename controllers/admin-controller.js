//Admin or organization
import asyncHandler from "express-async-handler";
import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

//importing isAdmin to check if organization is an Admin
import isAdmin from "../middlewares/isAdmin.js";
import { getToken, verifyToken } from "../utils/tokens.js";
import { organization as Organization } from "../models/organization.model.js";

const router = express.Router();
dotenv.config();

const createAdmin = asyncHandler(async (req, res) => {
  const { organization_name, lunch_price, currency_code } = req.body;

  const authHeader = req.headers.authorization;
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json({
      message: "An error occured",
      errorMessage: "Invalid auth header",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    verifyToken(token);
  } catch (error) {
    return res.status(403).json({
      message: "An error occured",
      errorMessage: "Not authorized",
    });
  }

  await Organization.findOrCreate({
    where: {
      organization_name: organization_name,
    },
    defaults: {
      currency_code: currency_code ?? "NGN",
      lunch_price: lunch_price ?? 1000,
    },
  })
    .then(([user, created]) => {
      if (!created) {
        return res.status(500).send({
          message: "An Error Occured",
          errorMessage: `${organization_name} already exists`,
        });
      }

      return res.status(201).send({
        message: "Organization Created Successfully",
        data: user.dataValues,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "An Error Occured",
        errorMessage: error.message,
      });
    });
});

const createInvite = asyncHandler(async (req, res) => {});

export { createInvite, createAdmin };
