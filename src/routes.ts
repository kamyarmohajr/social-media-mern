import { Express } from "express";
import { createUserHandler } from "./controllers/user.controller";
import validate from "./middlewares/validateResource";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import deserializedUser from "./middlewares/deserializedUser";
const routes = (app: Express) => {
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post(
    "/api/session",
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", deserializedUser, getUserSessionsHandler);
  app.delete("/api/session", deserializedUser, deleteUserSessionHandler);

  app.post("/api/post/create");
  app.get("/api/post/:postId");
};

export default routes;
