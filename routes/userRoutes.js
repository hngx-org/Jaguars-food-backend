import express from "express";
const router = express.Router();

// Import your controller functions for handling the routes
// import {
//   getOrganizationProfile,
//   addBankAccount,
//   getAllUsers
// } from "./yourControllerModule"; // Replace "yourControllerModule" with the actual path to your controller module

// Define routes and associate them with controller functions
router.get('/profile', getOrganizationProfile);
router.post('/bank', addBankAccount);
router.get('/users', getAllUsers);

export default router;
