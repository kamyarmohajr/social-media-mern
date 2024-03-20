import mongoose from "mongoose";
import config from "config";
import logger from "./logger.util";

const connect = async () => {
  const dbUri: string = config.get<string>("DATABASE_URI");
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
