const asyncHandler = require('express-async-handler');
const db = require('../models');

//SEND A LUNCH
const createLunch = asyncHandler(async (req, res) => {
	try {
		// const userId = req.user.id; // user not present
		const { receivers, quantity, note } = req.body;
		const lunch = await db.lunches.create({
			senderId: userId,
			quantity,
			note,
		});
		return res.send(lunch);
		// await lunch.setReceivers(receivers);
		// return res
		// 	.status(200)
		// 	.json({ message: 'Lunch created successfully.', lunch });
	} catch (error) {
		throw new Error('Internal Server Error');
	}
});

//GET A LUNCH
// const getLunch = asyncHandler(async (req, res) => {
// 	try {
// 		const lunchId = req.params.lunchId;
// 		const lunch = await lunches.findByPk(lunchId);
// 		if (!lunch) {
// 			return res.status(400).json({ error: 'Lunch not found' });
// 		}
// 		res.status(200).json({ lunch });
// 	} catch (error) {
// 		throw new Error('Internal Server Error');
// 	}
// });

// //GET ALL LUNCHES
// const getAllLunches = asyncHandler(async (req, res) => {});

module.exports = {
	createLunch,
	// getLunch,
	// getAllLunches,
};
