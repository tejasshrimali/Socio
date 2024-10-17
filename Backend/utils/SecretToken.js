import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "15s",
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY);
};

export { createAccessToken, createRefreshToken };
