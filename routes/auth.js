import express from "express";
import { index, register, login } from "../controllers/auth.js";

const router = express.Router();

router.get("/", index);
router.get("/register", register);
router.get("/login", login);

export default router;
