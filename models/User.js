import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const bcryptSalt = Number(process.env.BCRYPT_SALT);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  img: {
    type: String,
    default:
      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(this.password, bcryptSalt);
  this.password = hashedPassword;
  next();
});

export default mongoose.model("Users", UserSchema);
