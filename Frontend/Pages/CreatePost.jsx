import { useState } from "react";
import { postsStore } from "../src/Store/posts.store";
import { userStore } from "../src/Store/user.store";

const CreatePost = () => {
  const [post, setNewPost] = useState({
    author: "",
    title: "",
    content: " ",
    image: "",
  });
  const { createPost } = postsStore();
  const { user } = userStore();
  const handleCreatePost = async () => {
    const { message, success } = await createPost({ ...post, author: user.name });
    console.log(message, success);
  };
  return (
    <div className="createPost_container w-full justify-center h-screen flex">
      <div className="createPost_prompt h-fit text-xl">
        <h1 className="text-2xl font-bold">Create post</h1>
        <input
          id="title"
          type="text"
          className="p-3 mb-5 rounded-md"
          value={post.name}
          placeholder="Title"
          onInput={(e) => setNewPost({ ...post, title: e.target.value })}
        ></input>
        <br />
        <input
          id="content"
          value={post.content}
          type="email"
          className="p-3 mb-5 rounded-md"
          placeholder="Describe your post"
          onInput={(e) => setNewPost({ ...post, content: e.target.value })}
        ></input>
        <br />
        <input
          id="image"
          value={post.image}
          type="text"
          placeholder="image url"
          className="p-3 mb-5 rounded-md"
          onInput={(e) => setNewPost({ ...post, image: e.target.value })}
        ></input>
        <button onClick={handleCreatePost} className="p-3 btn w-full rounded-md mb-8">
          Continue
        </button>
        <br />
      </div>
    </div>
  );
};

export default CreatePost;
