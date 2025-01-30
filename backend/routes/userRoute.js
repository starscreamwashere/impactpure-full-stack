import express from "express";
import {
    loginUser,
    registerUser,
    adminLogin,
    sendOtp,
    verifyOtp,
    resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

// User routes
userRouter.post("/register", registerUser); // User registration
userRouter.post("/login", loginUser); // User login
userRouter.post("/send-otp", sendOtp); // Send OTP for phone verification
userRouter.post("/verify-otp", verifyOtp); // Verify OTP for phone verification
userRouter.post("/reset-password", resetPassword); // Reset password

// Admin route
userRouter.post("/admin", adminLogin); // Admin login

export default userRouter;
