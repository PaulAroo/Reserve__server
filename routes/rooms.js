import express from "express";
import { check, param } from "express-validator";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomControllers.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

router.post(
  "/:hotelid",
  [
    check("title", "room title is required").exists(),
    check("price", "room price(as a number) is required").exists().isInt(),
    check("maxPeople", "maxPeople(as a number) is required").exists().isInt(),
    check("desc", "room description is required").exists(),
    param("hotelid", "hotel id is required").exists(),
  ],
  verifyAdmin,
  createRoom
);

router.put("/availability/:id", updateRoomAvailability);

router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom);

router.get("/:id", getRoom);

router.get("/", getAllRooms);

export default router;
