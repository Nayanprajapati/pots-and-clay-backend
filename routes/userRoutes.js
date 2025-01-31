const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/userModels");
const userControllers = require("../controller/userControllers");
const sendOtpControllers = require("../controller/sendOtpControllers");
const verifyOtpControllers = require("../controller/verifyOtpControllers");
const resetPasswordControllers = require("../controller/resetPasswordControllers");

// Rate limiting middleware for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: "Too many login attempts. Please try again later.",
});

// Make a create user API
router.post("/create", userControllers.createUser);

// Login user API, apply the rate limiter middleware here
router.post("/login", userControllers.loginUser);

// Send OTP route
router.post("/send-otp", sendOtpControllers.sendOtp);

// Verify OTP route
router.post("/verify-otp", verifyOtpControllers.verifyOtp);

// Reset Password route
router.post("/reset-password", resetPasswordControllers.resetPassword);

module.exports = router;
