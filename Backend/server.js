import express from "express";
import userRouter from "./Routes/user.route.js";
import { connectDB } from "./config/db.js";
import postRouter from "./Routes/post.route.js";
import cookieParser from "cookie-parser";
import { refreshAccessToken, userVerification } from "./Middleware/AuthMiddleware.js";
import { getUserFeed, getUserPosts } from "./controller/user.controller.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin:  "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

app.use(express.json());
app.use(cookieParser());
app.use("/api/", userRouter, postRouter);
app.get("/", userVerification, getUserFeed);
app.get("/myposts", userVerification, getUserPosts);
app.get("/token", refreshAccessToken);
app.listen(3000, () => {
  connectDB();
  console.log("server started at http://localhost:3000");
});
