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

})

export{
    getUserProfile,
    editUserProfile,
    getAllUsers,
    addUserBank,
    searchUser,
    createWithdrawal,
}