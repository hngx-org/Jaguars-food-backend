import asyncHandler from "express-async-handler";
import { Lunches } from "../models/lunches.model";


//SEND A LUNCH
const createLunch = asyncHandler(async(req,res) =>
{

})

//GET A LUNCH
const getLunch = asyncHandler(async(req,res) =>
{
    try {
        const lunchId = req.params.lunchId;
        const lunch = await Lunches.findByPk(lunchId);
        if (!lunch) {
          return res.status(404).json({ error: 'Lunch not found' });
        }
        res.status(200).json({ lunch });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

//GET ALL LUNCHES
const getAllLunches = asyncHandler(async(req,res) =>
{

})



export{
    createLunch,
    getLunch,
    getAllLunches,

}