import express from "express";

import { createUser, getUsers, loginUser, logOutUser, updateUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/createUser", createUser);
userRouter.post("/updateUser/:id", updateUser);
userRouter.get("/users", getUsers);
userRouter.post("/userLogin", loginUser);
userRouter.post("/logout", logOutUser);

export default userRouter;
