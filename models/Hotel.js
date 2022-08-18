import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema);

/*
Hotel REV
 - sometimes a detour isn't always a bad idea

choosing between mongoose validation and express validator ????
 https://stackoverflow.com/questions/61688724/what-is-the-difference-between-mongoose-validation-and-using-express-validator#:~:text=If%20the%20validation%20logic%20is,have%20to%20create%20custom%20validators.


I believe this stack overflow post answers the question correctly


because express-validator is a middle-ware
it serves as a better validator (less code is run before validation occurs)

*/
