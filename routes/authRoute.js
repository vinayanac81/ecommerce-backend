import express from "express";
import { adminLogin, googleLogin, userLogin, userSignup } from "../controllers/authController.js";

const router = express.Router();

router.post("/admin/login",adminLogin);
router.post("/user/signup",userSignup)
router.post("/user/google-login",googleLogin)
router.post("/user/login",userLogin)

export default router;
