import express from "express";

import { createUser, getUserFeed, getUsers, loginUser, logOutUser, updateUser } from "../controller/user.controller.js";
import { userVerification } from "../Middleware/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/createUser", createUser);
userRouter.post("/updateUser/:id", updateUser);
userRouter.get("/users", getUsers);
userRouter.post("/userLogin", loginUser);
userRouter.get("/verify", userVerification);
userRouter.post("/logout", logOutUser);

export default userRouter;
