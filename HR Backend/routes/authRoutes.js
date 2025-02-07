const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

// User Login
router.post("/login", authController.loginUser);

// User Logout
router.post("/logout", authController.logoutUser);

// Get Logged-in User
router.get("/me", authenticate, authController.getCurrentUser);
router.post("/logout", authController.logoutUser);
module.exports = router;
