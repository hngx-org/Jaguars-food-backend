const asyncHandler = require('express-async-handler');

//SEND A LUNCH
const createLunch = asyncHandler(async (req, res) => {});

//GET A LUNCH
const getLunch = asyncHandler(async (req, res) => {});

//GET ALL LUNCHES
const getAllLunches = asyncHandler(async (req, res) => {});

module.exports = {
	createLunch,
	getLunch,
	getAllLunches,
};
