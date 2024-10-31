const PostsCard = ({ post }) => {
  return (
    <div className="container post_container p-3 rounded-md gap-2">
      <p className="post_author text-sm text-left mb-3">{post.author}</p>
      <div className="post_details">
        <h1 className="post_title text-left text-lg font-bold mb-1">{post.title}</h1>
        <p className="post_description text-justify mb-1">{post.content}</p>
        <img src={post.image} alt={post.title} className="w-full h-min" />

        <p className="post_likes rounded-md p-2 justify-self-start mt-1">{post.likes}</p>
      </div>
    </div>
  );
};

export default PostsCard;
