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

  // This would be unnecessary if allowBlank is set to false along with
  // allowNull in the schema.
  if (!organization_name) {
    return res.status(400).json({
      message: "An error occurred",
      errorMessage: "Organization name cannot be empty",
    });
  }

  const authHeader = req.headers.authorization;
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json({
      message: "An error occurred",
      errorMessage: "Invalid auth header",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    verifyToken(token);
  } catch (error) {
    return res.status(403).json({
      message: "An error occurred",
      errorMessage: "Not authorized",
    });
  }
  console.log("LUNCH PRICE", lunch_price ?? 1000);
  await Organization.findOrCreate({
    where: {
      name: organization_name,
    },
    defaults: {
      currency: currency_code || "NGN",
      lunch_price: lunch_price || "1000",
    },
  })
    .then(([user, created]) => {
      if (!created) {
        return res.status(500).send({
          message: "An error occurred",
          errorMessage: `Organization '${organization_name}' already exists`,
        });
      }

      return res.status(201).send({
        message: "Organization created successfully",
        data: user.dataValues,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "An error occurred",
        errorMessage: error.message,
      });
    });
});

const createInvite = asyncHandler(async (req, res) => {});

export { createInvite, createAdmin };
