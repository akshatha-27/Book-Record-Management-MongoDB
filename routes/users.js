const express = require("express");
const router = express.Router();
const { users } = require("../data/users.json");

const {
  getAllUsers,
  getSingleUserById,
  createNewUser,
  updateUser,
  deleteUser,
  getSubscriptionDetailsById,
} = require("../controllers/user-controller");

const { UserModel, BookModel } = require("../models/index");

//Get all the users
router.get("/", getAllUsers);

//Get single user by ID
router.get("/:id", getSingleUserById);

//Creating a new user
router.post("/", createNewUser);

//Updating a user by ID
router.put("/updateUser/:id", updateUser);

//Deleting a user by ID
router.delete("/:id", deleteUser);

//Get all user subscription details
router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;
