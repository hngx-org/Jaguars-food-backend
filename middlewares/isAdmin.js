<<<<<<< HEAD
import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js';

const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.user;

        const getUser = await User.findOne({ id });

        if (!getUser.isAdmin) throw new Error('You lack admin priviledges');
        next();
    } catch (error) {
        throw new Error(error);
    }
=======
const asyncHandler = require('express-async-handler');
const { user } = require('../models');

const isAdmin = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.user;

		const getUser = await user.findOne({ id });
		// console.log(getUser);

		if (!getUser.isAdmin) {
			res.status(403);
			throw new Error('You lack admin priviledges');
		}
		next();
	} catch (error) {
		throw new Error(error);
	}
>>>>>>> develop
});

module.exports = isAdmin;
