import { FilterQuery } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { omit } from "lodash";
export const createUser = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    return new Error(error.message);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  const user = await UserModel.findOne(query).lean();
  if (!user) return new Error("user not found");
  return user;
};
