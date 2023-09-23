import asyncHandler from "express-async-handler";
import { organization } from "../models/organization.model.js";
import errHandler from "../middlewares/errHandler.js";

/// THIS IS TO CREATE AN ORGANIZATION
const createOrganization = asyncHandler(async (req, res) => {
  const { name, lunch_price, currency } = req.body;

  organization.findOne({
    where: { name },
  }).then(async (user) => {
    if (user) {
      res.status(400);
      throw new Error(`${name} Exists, please use another name`);
    } else {
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
          res.status(504);
          throw new Error(error.errorMessage);
        });
    }


  }).catch((error) => {
    errHandler(error, req, res);
  });



});

export { createOrganization };
