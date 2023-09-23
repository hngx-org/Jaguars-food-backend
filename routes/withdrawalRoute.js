const { Router } = require("express");
const { createWithdrawal } = require("../controllers/users-controller.js");
const { validateSchema } = require("../middlewares/input-validator.js");
const { CreateWithdrawal } = require("../schema/user-schema.js");

const router = Router();

// Withdrawal Request
router.post("/request", validateSchema(CreateWithdrawal), createWithdrawal);

module.exports = router;
