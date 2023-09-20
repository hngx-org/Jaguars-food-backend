import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { OrganizationModel as orgModel } from "../models/organization/organizationModel.js";

console.log(jwt.decode("lalala"));
/// THIS IS TO CREATE AN ORGANIZATION
const createOrganization = asyncHandler(async (req, res) => {
  const { organization_name, lunch_price, currency_code } = req.body;

  const authHeader = req.headers.authorization;
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json({
      message: "An error occured",
      errorMessage: "Invalid auth header",
    });
  }
  const token = authHeader.split(" ")[1];

  // NOTE: This, instead of the `if (!isTokenValid)` check, would be used when
  // the jwt secret has been set up.
  // try {
  //   jwt.verify(token, process.env.<jwt secret>);
  // } catch(error) {
  //   return res.status(403).json({
  //     message: "An error occured",
  //     errorMessage:"Not authorized",
  // });
  // }

  const isTokenValid = jwt.decode(token);

  if (!isTokenValid) {
    return res.status(403).json({
      message: "An error occured",
      errorMessage: "Not authorized",
    });
  }

  try {
    await orgModel
      .create({
        organization_name: organization_name,
        currency_code: currency_code ?? "NGN",
        lunch_price: lunch_price ?? 1000,
      })
      .then((createdUser) => {
        console.log(createdUser);

        return res.status(202).send({
          message: "Organization Created Successfully",
          data: createdUser.dataValues,
        });
      })
      .catch((error) => {
        return res.status(504).send({
          message: "An Error Occured",
          errorMessage: `${organization_name} exists try using another name`,
        });
      });
  } catch (error) {
    return res.status(504).send({
      message: "An Error Occured",
      errorMessage: error.message,
    });
  }
});

export { createOrganization };
