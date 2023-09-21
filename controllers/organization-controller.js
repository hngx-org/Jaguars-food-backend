import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { organization } from "../models/organization.model.js";
import errHandler from "../middlewares/errHandler.js";

/// THIS IS TO CREATE AN ORGANIZATION
const createOrganization = asyncHandler(async (req, res) => {
  const { name, lunch_price, currency } = req.body;

  organization.findOne({
    where: { name },
  }).then(async (user) => {
    if (user) return res.status(504).send({
      message: "An Error Occured",
      errorMessage: `${name} exists try using another name`,
    });

    await organization
      .create({
        name: name,
        currency: currency ?? "NGN",
        lunch_price: lunch_price ?? 1000,
      })
      .then((createdUser) => {
        return res.status(202).send({
          message: "Organization Created Successfully",
          data: createdUser.dataValues,
        });
      })
      .catch((error) => {
        return res.status(504).send({
          message: "An Error Occured",
          errorMessage: error.message,
        });
      });
  }).catch((error) => {
    return res.status(500).send({
      message: "An Error Occured",
      errorMessage: error.message,
    });
  });



});

export { createOrganization };
