const {validateLoginRequestBody} = require("./RequestBody");
const validateAdminRequestBody = require("./validateAdminRequestBody");
const validateStaffSignUpRequest = require("./validateStaffRequestBody")

module.exports = {
    validateAdminRequestBody,
    validateLoginRequestBody,
    validateStaffSignUpRequest
}