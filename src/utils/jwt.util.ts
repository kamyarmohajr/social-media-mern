import config from "config";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

const PUBLIC_SECRET = config.get<string>("PUBLIC_SECRET");
const PRIVATE_SECRET = config.get<string>("PRIVATE_SECRET");

export const signJwt = async (
  object: Object,
  signOptions?: SignOptions | undefined
) => {
  try {
    const token = await jwt.sign(object, PRIVATE_SECRET, {
      ...(signOptions && signOptions),
    });
    return token;
  } catch (error: any) {
    return new Error(error.message);
  }
};
export const verifyJwt = async (token: string) => {
  try {
    const decoded = await jwt.verify(token, PUBLIC_SECRET);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
