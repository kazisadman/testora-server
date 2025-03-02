import { Types } from "mongoose";
import errorHandler from "../../utils/errorHandler";
import { TRegisterUser } from "./user.interface";
import User from "./user.model";

const findUserInDb = async (payload: string) => {
  const result = await User.findOne({ email: payload });
  return result;
};

const findUserByIdInDb = async (payload: Types.ObjectId) => {
  const result = await User.findById({ _id: payload }).select(
    "-password -accessToken"
  );
  return result;
};

const createUserInDb = async (payload: TRegisterUser) => {
  const result = await User.create(payload);
  if (result) {
    const userInfo = await User.findById(result._id).select(
      "-password -accessToken"
    );

    return userInfo;
  } else {
    throw new errorHandler(500, "Something went wrong while registering user");
  }
};

const logOutUserFromDb = async (paylaod: Types.ObjectId) => {
  const result = User.findByIdAndUpdate(
    paylaod,
    {
      $unset: {
        accessToken: 1,
      },
    },
    {
      new: true,
    }
  );
  return result;
};

const getAllUserFromDb = async () => {
  const data = await User.find().select("-password -accessToken");
  return data;
};


export const userService = {
  findUserInDb,
  createUserInDb,
  findUserByIdInDb,
  logOutUserFromDb,
  getAllUserFromDb,
};
