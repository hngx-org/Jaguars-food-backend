import asyncHandler from "express-async-handler";
import { OrganizationModel as orgModel } from "../models/organization/organizationModel.js";


/// THIS IS TO CREATE AN ORGANIZATION
const createOrganization = asyncHandler(async (req, res) => {
    const { organization_name, lunch_price, currency_code } = req.body;
    try {
        orgModel.findOne({
            where: { organization_name }
        }).then(async (result) => {
            if (result) return res.status(400).send({
                message: "Organization Exists",
                errorMessage: `${organization_name} exists try using another name`
            });

            await orgModel.create({
                organization_name: organization_name,
                currency_code: currency_code ?? "NGN",
                lunch_price: lunch_price ?? 1000
            }).then((createdUser) => {
                console.log(createdUser);

                return res.status(202).send({
                    message: "Organization Created Successfully",
                    data: createdUser.dataValues
                });
            }).catch((error) => {
                return res.status(504).send({
                    message: "An Error Occured",
                    errorMessage: error.message
                });
            });
        }).catch((error) => {
            return res.status(504).send({
                message: "An Error Occured",
                errorMessage: error.message
            });
        })

    } catch (error) {
        return res.status(504).send({
            message: "An Error Occured",
            errorMessage: error.message
        });
    }
})

export {
    createOrganization,

}