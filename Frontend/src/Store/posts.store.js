import { create } from "zustand";

export const postsStore = create((set) => ({
  posts: [],
  setPost: (posts) => set({ posts }),
  fetchPosts: async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    if (!data.success) return { success: false, message: "there was error loading posts" };
    set({
      posts: data.data,
    });
  },
  createPost: async (post) => {
    if (!post.title) return { success: false, message: "title is madatory" };
    const res = await fetch("/api/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({ posts: [...state.posts, data.data] }));
    return { success: true, message: "Post created!" };
  },
}));
