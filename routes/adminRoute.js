import { Router } from 'express';
import { createAdmin, createInvite } from '../controllers/admin-controller.js';
import isAdmin from '../middlewares/isAdmin.js';
const router = Router();

router.post('/organization/create', createAdmin);
router.post('/organization/invite', createInvite);

export default router;
