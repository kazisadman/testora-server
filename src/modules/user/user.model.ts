import mongoose, { Schema } from "mongoose";
import { TRegisterUser } from "./user.interface";

const userSchema = new Schema<TRegisterUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
});


const User = mongoose.model("User", userSchema);

export default User;
