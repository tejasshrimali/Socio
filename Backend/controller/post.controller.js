import Post from "../models/Post.model.js";

const createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user.name });
    res.status(200).json({ message: "Post was created", data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Post was updated", data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: `${post.title} was deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { createPost, updatePost, getPosts, deletePost };
