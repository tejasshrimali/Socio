import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // URL of the image if the post includes one
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References to the users who liked the post
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the user who made the comment
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

const Post = mongoose.model("Post", PostSchema);
export default Post;
