import express from "express";
import { check } from "express-validator";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "username is required").exists(),
    check("email", "a valid email is required").exists().isEmail(),
    check("password", "password is required").exists(),
    check("country", "country is required").exists(),
    check("city", "city is required").exists(),
    check("phone", "phone number is required").exists(),
  ],
  register
);
router.post(
  "/login",
  [
    check("username", "username is required").exists(),
    check("password", "password is required").exists(),
  ],
  login
);

export default router;
