import express from "express";
const router = express.Router();


router.post('/send', sendLunch);
router.get('/:id', getSpecificLunch);
router.get('/all', getAllLunch);
router.put('/redeem/:id', getUserLunch);

export default router;