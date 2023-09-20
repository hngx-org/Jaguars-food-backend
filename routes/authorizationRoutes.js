import express from "express";
const router = express.Router();

// Import your controller functions for handling the routes
// import {
//   handleOganization_User_Login,
//   handleOganizationSignUp,
//   handleStaffSignUp
// } from "./yourControllerModule"; // Replace "yourControllerModule" with the actual path to your controller module

// Define routes for login and signup
router.post('/login', handleOrganization_User_Login);
router.post('/user/signup', handleOrganizationSignUp);

// Define a route for staff signup with a query parameter
router.post('/signup', handleStaffSignUp);

export default router;
