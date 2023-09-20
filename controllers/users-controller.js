import asyncHandler from "express-async-handler";

// when the databse is integrated, i'd refernece this model
// import User from "./models";

//Relying on dummy data to test endpoint
const Users = [
  {
    name: "John Doe",
    email: "john@mail.com",
    profile_picture: "user-profile-picture-url",
    user_id: "",
  },
  {
    name: "John Doe",
    email: "john@mail.com",
    profile_picture: "user-profile-picture-url",
    user_id: "",
  },
];

//user is employee
//GET USER PROFILE
const getUserProfile = asyncHandler(async (req, res) => {});

//EDIT USER PROFILE
const editUserProfile = asyncHandler(async (req, res) => {});

//ADD USER BANK ACCOUNT
const addUserBank = asyncHandler(async (req, res) => {});

//GET ALL USERS
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // const Users = await User.findAll() <-- this is a method on the sequalize model which is not yet available
    res.json({
      message: "successfully created bank account",
      statusCode: 200,
      data: Users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//GET(SEARCH) USER BY NAME OR MAIL
const searchUser = asyncHandler(async (req, res) => {});

//CREATE WITHDRAWAL REQUEST
const createWithdrawal = asyncHandler(async (req, res) => {});

export {
  getUserProfile,
  editUserProfile,
  getAllUsers,
  addUserBank,
  searchUser,
  createWithdrawal,
};
