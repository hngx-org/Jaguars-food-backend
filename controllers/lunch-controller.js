const asyncHandler = require('express-async-handler');
const db = require('../models');

//SEND A LUNCH
// TODO:
const createLunch = asyncHandler(async (req, res) => {
	try {
		const { id, orgId } = req.user; // user not present
		// console.log({ id, orgId });
		const { receivers, quantity, note } = req.body;

		// await receivers.map(async (receiver) => {
		const lunch = await db.lunches.create({
			senderId: id,
			receiverId: receivers[0],
			quantity,
			note,
			org_id: orgId,
		});
		// });
		console.log({
			senderId: id,
			receiverId: receivers[0],
			quantity,
			note,
			org_id: orgId,
		});
		return res.json({ status: 'successful', message: 'Lunch(es) sent' });
	} catch (error) {
		throw new Error('Internal Server Error');
	}
});

//GET A LUNCH
const getLunch = asyncHandler(async (req, res) => {
	const { id } = req.params;

	// console.log(req.params);
	if (id) {
		const lunch = await db.lunches.findOne({ where: { id } });
		if (!lunch) {
			res.status(404);
			throw new Error(`No Lunch exist for ${id}`);
		} else {
			const data = {
				receiverId: lunch.receiverId,
				senderId: lunch.senderId,
				quantity: lunch.quantity,
				redeemed: lunch.redeemed,
				note: lunch.note,
				created_at: lunch.created_at,
				id: lunch.id,
			};
			const msg = 'The Lunch is available';
			res.status(200).json({ message: msg, statusCode: 200, data });
		}
		res.status(400);
		throw new Error('Please provide an id');
	}
});

// //GET ALL LUNCHES
const getAllLunches = asyncHandler(async (req, res) => {
	try {
		const { id } = req.user;
		if (!id) { res.status(400); throw new Error('Please provide an id.'); }
		const lunches = await db.lunches.findALl({ where: { receiverId: id } });
		return res.status(200).json(lunches);

	} catch (error) {
		throw new Error('Internal Server Error');
	}
});

module.exports = {
	createLunch,
	getLunch,
	getAllLunches,
};