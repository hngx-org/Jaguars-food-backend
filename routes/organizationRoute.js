import express from "express";
const router = express.Router();

// Import your controller functions for handling the routes
// import { createOrganization, createOrganizationInvite } from "./yourControllerModule"; // Replace "yourControllerModule" with the actual path to your controller module

// Define routes and associate them with controller functions
router.post('/create', createOrganization);
router.post('/invite', createOrganizationInvite);

export default router;
