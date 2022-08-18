import User from "../models/User.js";

const index = (req, res) => {
  res.send("authentication root");
};

const register = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
};

const login = (req, res) => {
  res.send("authentication login root");
};

export { index, register, login };
