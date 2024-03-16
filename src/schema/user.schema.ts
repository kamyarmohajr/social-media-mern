import { TypeOf, object, string } from "zod";
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("email is not valid"),
    password: string({
      required_error: "password is required",
    }).min(8, "password must be more than 8 chracters"),
    passwordConfirmation: string({
      required_error: "password is required",
    }).min(8, "password must be more than 8 chracters"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
