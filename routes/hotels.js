import express from "express";
import { check } from "express-validator";
import { createHotel } from "../controllers/hotel.js";

const router = express.Router();

router.post(
  "/",
  [
    check("name", "hotel name is required").exists(),
    check("type", "hotel type is required").exists(),
    check("city", "city field is required").exists(),
    check("city", "hotel address is required").exists(),
    check("distance", "distance field is required").exists(),
    check("title", " hotel title is required").exists(),
    check("desc", " hotel description is required").exists(),
    check("rating", "rating must be between 0 and 5").isInt({ min: 0, max: 5 }),
    check("cheapestPrice", " hotel cheapestPrice is required").exists().isInt(),
  ],
  createHotel
);

export default router;
