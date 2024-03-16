import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializedUser from "./middlewares/deserializedUser";
const port = config.get<number>("port");

const app = express();
app.use(express.json());

// app.use(deserializedUser);

app.listen(port, async () => {
  logger.info("app is running");
  await connect();
  routes(app);
});
