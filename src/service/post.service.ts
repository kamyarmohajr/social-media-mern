import PostModel, { PostInput } from "../models/post.model";

export const getPost = async (id: string) => {
  try {
    return await PostModel.findOne({ id }).lean();
  } catch (error: any) {
    return new Error(error.message);
  }
};
export const createPost = async (input: PostInput) => {
  try {
    const post = await PostModel.create(input);
    return post.toJSON();
  } catch (error: any) {
    return new Error(error.message);
  }
};
