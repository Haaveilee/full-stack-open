import { useState } from "react";

const Blog = ({ blog, likePost, removePost }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setDetailsVisible] = useState(false);
  const showWhenVisible = { display: detailsVisible ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? "hide" : "show"}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={likePost}>Like</button>
        </div>
        <div>{blog.user && blog.user.name}</div>
        <button onClick={removePost}>Remove</button>
      </div>
    </div>
  );
};

export default Blog;
