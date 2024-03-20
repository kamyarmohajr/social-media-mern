import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { omit } from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt.util";
import { UserDocument } from "../models/user.model";
import { findUser } from "./user.service";
import { get } from "lodash";
import config from "config";

export const createUserSession = async (userId: string, userAgent: string) => {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return omit(session.toJSON(), "password");
  } catch (error: any) {
    return new Error(error.message);
  }
};

export const findUserSessions = async (query: FilterQuery<SessionDocument>) => {
  try {
    return await SessionModel.find(query).lean();
  } catch (error: any) {
    return new Error(error.message);
  }
};

export const updateUserSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return await SessionModel.updateOne(query, update).lean();
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = await verifyJwt(refreshToken);

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return new Error("not valid");

  const user = await findUser({ _id: session.user });

  if (!user) return new Error("user not found");

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  return accessToken;
};
