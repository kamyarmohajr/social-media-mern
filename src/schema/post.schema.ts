import { object, string, TypeOf } from "zod";

export const createPostSchema = object({
  body: object({
    title: string({
      required_error: "title is required",
    }).max(50, "50 characters maximum"),
    description: string({
      required_error: "title is required",
    }).max(5000, "5000 characters maximum"),
    picturePath: string({
      required_error: "title is required",
    }),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
