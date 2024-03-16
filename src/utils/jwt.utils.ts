import config from "config";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export const signJwt = async (
  object: Object,
  signOptions?: SignOptions | undefined
) => {
  try {
    const token = await jwt.sign(object, privateKey, {
      ...(signOptions && signOptions),
    });
    return token;
  } catch (error: any) {
    return new Error(error.message);
  }
};
export const verifyJwt = async (token: string) => {
  try {
    const decoded = await jwt.verify(token, publicKey);
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
