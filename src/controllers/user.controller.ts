import { Request, Response } from "express";
import logger from "../utils/logger.util";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    logger.info(req.body);
    const user = await createUser(req.body);
    return res.status(201).json({ user });
  } catch (error: any) {
    logger.error(error.message);
    res.status(409).send(error.message);
  }
};
