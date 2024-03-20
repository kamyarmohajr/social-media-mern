import { Request, Response } from "express";
import { createPost, getPost } from "../service/post.service";
import { CreatePostInput } from "../schema/post.schema";

export const createPostHandler = async (
  req: Request<{}, {}, CreatePostInput["body"]>,
  res: Response
) => {
  try {
    const post = await createPost(req.body);
    return res.status(201).json({
      status: 201,
      post,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const getPostHandler = async (req: Request, res: Response) => {
  try {
    if (!req.params.id)
      return res
        .status(404)
        .json({ status: 404, message: "user id is null!!!" });
    const post = await getPost(req.params.postId);
    return res.status(200).json({ status: 200, post });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
