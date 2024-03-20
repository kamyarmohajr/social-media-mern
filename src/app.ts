import connect from "./utils/connect.util";
import logger from "./utils/logger.util";
import createServer from "./utils/server.util";
import config from "config";

const PORT: number = config.get<number>("PORT");

const app = createServer();
app.listen(PORT, async () => {
  logger.info("app is running");
  await connect();
});

export default app;
