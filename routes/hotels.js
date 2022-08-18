import express from "express";
import { check, param } from "express-validator";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";

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

router.put("/:id", [param("id", "hotel id is required").exists()], updateHotel);

router.delete(
  "/:id",
  [param("id", "hotel id is required").exists()],
  deleteHotel
);

router.get(
  "/find/:id",
  [param("id", "hotel id is required").exists()],
  getHotel
);

router.get("/", getHotels);

export default router;
