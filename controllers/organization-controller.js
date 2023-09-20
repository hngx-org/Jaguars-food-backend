import asyncHandler from "express-async-handler";
import { OrganizationModel as orgModel } from "../models/organization/organizationModel.js";


/// THIS IS TO CREATE AN ORGANIZATION
const createOrganization = asyncHandler(async (req, res) => {
    const { organization_name, lunch_price, currency_code } = req.body;
    const isTokenValid = true;
    if (!isTokenValid) 
    /// Izuagie
    /// Get token from header and make use of the jwt middleware
    /// to verify if token is valid
    
        try {
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
                    errorMessage: `${organization_name} exists try using another name`
                });
            });
    
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