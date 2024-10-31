import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import dotenv from "dotenv";
import { createAccessToken } from "../utils/SecretToken.js";

dotenv.config();

const userVerification = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(404).json({ success: false, message: "Access token not found" });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(500).json({ message: err, success: false });
    } else {
      try {
        const user = await User.findById(data.id);
        return res
          .status(200)
          .json({ success: true, message: `Hello ${user.name}, Here are today's posts`, user: user });
      } catch (error) {
        return res.status(404).json({ success: false, message: "404 user not found" });
      }
      //  console.log(user);
    }
  });
};

const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json({ success: false, message: "Refresh token not found" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, data) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    const user = await User.findById(data.id);
    req.user = user;
    const accessToken = createAccessToken(user._id);
    res.cookie("accessToken", accessToken, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ message: "Token refreshed", success: true });
    next();
  });
};
export { userVerification, refreshAccessToken };
