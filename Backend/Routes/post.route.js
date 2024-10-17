import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controller/post.controller.js";

const postRouter = express.Router();

postRouter.post("/createPost", createPost);
postRouter.post("/updatePost/:id", updatePost);
postRouter.get("/posts", getPosts);
postRouter.post("/deletePost/:id", deletePost);

export default postRouter;
