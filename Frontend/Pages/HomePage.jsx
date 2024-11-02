import { Link } from "react-router-dom";
import { userStore } from "../src/Store/user.store.js";
import { postsStore } from "../src/Store/posts.store.js";
import { useEffect } from "react";
import PostsCard from "../src/Components/PostsCard";
import TopNavHeader from "../src/Components/TopNavHeader";

const HomePage = () => {
  const { user, isLoggedIn, verifyUser, logoutUser } = userStore();
  // console.log(user);
  const { fetchPosts, posts } = postsStore();
  const handelUserCheck = async () => {
    const { success, message } = await verifyUser();
    if (!success) {
      console.log(success, message);
    }
    //setUser(user);
  };

  const handleLogOut = async () => {
    const { success, message } = await logoutUser();
    if (!success) {
      console.log(message);
    }
  };

  handelUserCheck();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {/* <h1 className="text-3xl text-white">Hello this is a homepage</h1>
      <br />
      {isLoggedIn ? (
        <>
          Hello {user.name} <button onClick={handleLogOut}>Logout</button>
        </>
      ) : (
        <p>
          New here?considering
          <Link to={"/register"} className="text-blue-500">
            joining us
          </Link>
          or already a user?
          <Link to={"/login"} className="text-blue-500">
            login
          </Link>
        </p>
      )} */}
      <TopNavHeader></TopNavHeader>
      {isLoggedIn ? (
        <>
          Hello {user.name} <button onClick={handleLogOut}>Logout</button>
          <div className="posts_container container max-w-3xl flex flex-col gap-5 w-full justify-center">
            {posts.map((post) => {
              return <PostsCard post={post} key={post._id} />;
            })}
          </div>
        </>
      ) : (
        <p>
          New here? considering
          <Link to={"/register"} className="text-blue-500">
            joining us
          </Link>
          or already a user?
          <Link to={"/login"} className="text-blue-500">
            login
          </Link>
        </p>
      )}
    </>
  );
};

export default HomePage;
