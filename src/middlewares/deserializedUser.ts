import { Response, Request, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import logger from "../utils/logger";
import { reIssueAccessToken } from "../service/session.service";
import { get } from "lodash";

const deserializedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req.headers, "authorization")?.replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = get(req.headers, "x-refresh") as string;

  if (!accessToken) {
    next();
    return res
      .status(401)
      .json({ status: 401, message: "token is not available" });
  }
  try {
    const { expired, decoded } = await verifyJwt(accessToken);
    if (decoded) {
      res.locals.user = decoded;
      return next();
    }
    if (expired && refreshToken) {
      const accessToken = await reIssueAccessToken({ refreshToken });
      if (accessToken) res.setHeader("x-refresh", accessToken as string);
    }
  } catch (error: any) {
    res.status(401).json({ status: 401, message: error.message });
  }
};

export default deserializedUser;
