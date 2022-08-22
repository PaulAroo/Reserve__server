import express from "express";
import { check, param, query } from "express-validator";
import {
  countByCity,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

router.post(
  "/",
  [
    check("name", "hotel name is required").exists(),
    check("city", "city field is required").exists(),
    check("address", "hotel address is required").exists(),
    check("distance", "distance field is required").exists(),
    check("title", " hotel title is required").exists(),
    check("desc", " hotel description is required").exists(),
    check("rating", "rating must be between 0 and 5").isNumeric({
      min: 0,
      max: 5,
    }),
  ],
  verifyAdmin,
  createHotel
);

router.put(
  "/:id",
  verifyAdmin,
  [param("id", "hotel id is required").exists()],
  updateHotel
);

router.delete(
  "/:id",
  [param("id", "hotel id is required").exists()],
  verifyAdmin,
  deleteHotel
);

router.get(
  "/find/:id",
  [param("id", "hotel id is required").exists()],
  getHotel
);

router.get("/", getHotels);

router.get(
  "/countByCity",
  [query("city", "query parameter (city) is required").exists()],
  countByCity
);

export default router;
