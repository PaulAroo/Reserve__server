import { validationResult } from "express-validator";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newUser = new User(req.body);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return next(
        createError(
          400,
          `user with username ${req.body.username} already exists`
        )
      );

    const userDetails = await newUser.save();

    const { _id, isAdmin, password, ...otherDetails } = userDetails._doc;
    const token = jwt.sign({ id: _id, isAdmin }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({
        message: "user has been created",
        details: { ...otherDetails },
        isAdmin,
      });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(400, "user not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "wrong password or username"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { isAdmin, password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export { register, login };
