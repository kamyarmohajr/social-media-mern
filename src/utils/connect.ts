import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  return await mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("Connection is stablished");
    })
    .catch((error) => {
      logger.error("Could not connect");
    });
};

export default connect;
