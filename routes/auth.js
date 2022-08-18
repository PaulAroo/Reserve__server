import express from "express";
import { index, register, login } from "../controllers/authController.js";

const router = express.Router();

router.get("/", index);
router.post("/register", register);
router.get("/login", login);

export default router;
