import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createUserSession,
  findUserSessions,
  updateUserSession,
} from "../service/session.service";
import { UserDocument } from "../models/user.model";
import { signJwt } from "../utils/jwt.util";
import { SessionDocument } from "../models/session.model";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  const user = (await validatePassword(req.body)) as UserDocument;
  if (!user)
    res
      .status(401)
      .json({ status: 401, message: "invalid email or password!" });

  try {
    const session = (await createUserSession(
      user._id,
      req.get("user-agent") || ""
    )) as SessionDocument;

    // access token 15 minute
    const accessToken = await signJwt(
      { ...user, session: session._id },
      {
        expiresIn: config.get<string>("ACCESS_TOKEN_TTL"),
      }
    );
    // refresh token 1 year
    const refreshToken = await signJwt(
      { ...user, session: session._id },
      {
        expiresIn: config.get<string>("REFRESH_TOKEN_TTL"),
      }
    );

    res.status(201).json({
      status: "created",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "somthing went wrong!!!",
      message: error.message,
    });
  }
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const sessions = await findUserSessions({ user: userId, valid: true });
    if (!sessions)
      return res
        .status(404)
        .json({ status: 404, message: "session is not available" });
    return res.status(200).json({ status: 200, sessions: sessions });
  } catch (error: any) {
    return res.status(401).json({ status: 401, message: error.message });
  }
};

export const deleteUserSessionHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = res.locals.user.session;
    await updateUserSession({ _id: sessionId }, { valid: false });
    return res
      .status(200)
      .json({ status: 200, refreshToken: null, accessToken: null });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
