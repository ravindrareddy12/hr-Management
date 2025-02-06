const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create User
router.post("/create", userController.createUser);

// Get All Users
router.get("/", userController.getUsers);

// Delete User
router.delete("/:id", userController.deleteUser);

module.exports = router;
