import asyncHandler from "express-async-handler";

//user is employee
//GET USER PROFILE
const getUserProfile = asyncHandler(async(req,res) =>
{

})

//EDIT USER PROFILE
const editUserProfile = asyncHandler(async(req,res) =>
{

})

//ADD USER BANK ACCOUNT
const addUserBank = asyncHandler(async(req,res) =>
{

})

//GET ALL USERS
const getAllUsers = asyncHandler(async(req,res) =>
{

})

//GET(SEARCH) USER BY NAME OR MAIL
const searchUser = asyncHandler(async(req,res) =>
{

})

//CREATE WITHDRAWAL REQUEST
const createWithdrawal= asyncHandler(async(req,res) =>
{
    try {
        const lunchId = req.body.id; // Assume that the lunch's id is being passed in the body
        const lunch = await Lunch.findOne({where: { id: lunchId, userId: userId }});
         if (!lunch) {
      // if the lunch is not found.
      return res.status(400).send({ error: 'Lunch not found or does not belong to the user.' });
    }
        if (lunch.redeemed) {
      return res.status(400).send({ error: 'Lunch is already redeemed.' });
    }
        await lunch.update({ redeemed: true });
        return res.status(200).send({ message: 'Withdrawal and status update successful.', redeemed: true });
    }   catch (err) {
        console.log('error updating lunch status',err)
        return 'Error updating lunch status';
    }
})

export{
    getUserProfile,
    editUserProfile,
    getAllUsers,
    addUserBank,
    searchUser,
    createWithdrawal,
}