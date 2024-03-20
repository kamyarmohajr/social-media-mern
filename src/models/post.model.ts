import { Schema } from "mongoose";
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface PostInput {
  title: string;
  description: string;
  picturePath: string;
}
export interface PostDocument extends PostInput, mongoose.Document {
  user: UserDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
