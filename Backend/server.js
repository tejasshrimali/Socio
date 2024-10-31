import express from "express";
import userRouter from "./Routes/user.route.js";
import { connectDB } from "./config/db.js";
import postRouter from "./Routes/post.route.js";
import cookieParser from "cookie-parser";
import { refreshAccessToken, userVerification } from "./Middleware/AuthMiddleware.js";
import { getUserFeed, getUserPosts } from "./controller/user.controller.js";
import cors from "cors";

import path from "path";
const app = express();
const __dirname = path.resolve();
app.use(
  cors({
    origin: [],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/", userRouter, postRouter);
// app.get("/api/verifyUser", userVerification, getUserFeed);
// app.get("/api/userposts", userVerification, getUserPosts);
app.get("/api/tokenRefresh", refreshAccessToken);


app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(3000, () => {
  connectDB();
  console.log("server started at http://localhost:3000");
});
