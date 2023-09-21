import express from "express";
import dotenv from "dotenv";
import isAdmin from '../middlewares/isAdmin.js'
const router = express.Router();
dotenv.config();



// API endpoint for sending an invitation
router.post('/organizations/invite', isAdmin)// import the utility function for this

