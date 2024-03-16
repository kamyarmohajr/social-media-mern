import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import config from "config";
import logger from "../utils/logger";

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    let user = this as UserDocument;
    if (!user.isModified("password")) return next();
    const salt = await bcryptjs.genSalt(config.get<number>("roundOfSalt"));
    const hashedPassword = await bcryptjs.hash(user.password, salt);
    user.password = hashedPassword;
    return next();
  } catch (error: any) {
    logger.error(error.message);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcryptjs
    .compare(candidatePassword, user.password)
    .catch((error) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
