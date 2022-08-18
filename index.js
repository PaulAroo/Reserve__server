import express, { json } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import hotelRoutes from "./routes/hotels.js";
import roomRoutes from "./routes/rooms.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(json());

app.use("/auth", authRoutes);
app.use("/hotels", hotelRoutes);
app.use("/rooms", roomRoutes);
app.use("/users", userRoutes);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.Message || "Something went wrong!";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 3030;
const DbURI = process.env.DbURI;

mongoose
  .connect(DbURI)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${port}`);
});
