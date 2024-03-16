import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("invalid email"),
    password: string({
      required_error: "email is required",
    }).min(8, "password must be more than 8 chracters"),
  }),
});
