import mongoose from "mongoose";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/SecretToken.js";
import Post from "../models/Post.model.js";

const createUser = async (req, res) => {
  const { email } = req.body;
  const alreadyUser = await User.findOne({ email });
  if (alreadyUser) {
    return res.status(500).json({ success: false, message: "User already exits" });
  }
  try {
    const user = await User.create(req.body);
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    res.cookie("accessToken", accessToken, {
      withCredentials: true,
      httpOnly: false,
    });
    res.cookie("refreshToken", refreshToken, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ success: true, message: "User created succesfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email or password is incorrect", success: false });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(404).json({ message: "Email or password is incorrect", success: false });
    }
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    res.cookie("accessToken", accessToken, {
      withCredentials: true,
      httpOnly: false,
    });
    res.cookie("refreshToken", refreshToken, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Prduct not found" });
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ data: user, message: "User was updated", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logOutUser = async (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.status(200).json({ success: true, message: "Logout successfully" });
};

const getUserPosts = async (req, res) => {
  const user = req.user;
  // console.log(user);
  try {
    const posts = await Post.find({ user: user._id });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(404).json({ success: false, message: "No posts found" });
  }
};

const getUserFeed = async (req, res) => {
  const user = req.user;
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, message: `Hello ${user.name}, Here are today's posts`, post: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createUser, updateUser, getUsers, loginUser, logOutUser, getUserPosts, getUserFeed };
