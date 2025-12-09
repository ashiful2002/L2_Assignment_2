import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const apiVersion = "/api/v1";
const config = {
  port: process.env.PORT,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  api_version: apiVersion,
  jwt_secret: process.env.JWT_SECRET,
};

export default config;
