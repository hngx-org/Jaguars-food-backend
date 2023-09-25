const {validateLoginRequestBody} = require("./RequestBody");
const validateAdminRequestBody = require("./validateAdminRequestBody");
const validateStaffSignUpRequest = require("./validateStaffRequestBody");
const validateCreateInvite = require("./createInvite");
const validateCreateLunch = require("./createLunch");
const validateRedeemLunch = require("./redeemLunch");

module.exports = {
    validateAdminRequestBody,
    validateLoginRequestBody,
    validateStaffSignUpRequest,
    validateCreateInvite,
    validateCreateLunch,
    validateRedeemLunch
}