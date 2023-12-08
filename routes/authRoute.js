import express from "express";
import { adminLogin, googleLogin, userLogin, userSignup, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/admin/login",adminLogin);
router.post("/user/signup",userSignup)
router.post("/user/google-login",googleLogin)
router.post("/user/verify-otp",verifyOtp)
router.post("/user/login",userLogin)

export default router;
