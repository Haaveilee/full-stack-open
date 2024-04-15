import { useState } from "react";

const BlogEditor = ({ createBlogPost }) => {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [url, setUrl] = useState(null);

  const handleCreate = async (event) => {
    event.preventDefault();
    createBlogPost(title, author, url);
  };

  return (
    <div>
      <h2>Create a new blog post</h2>

      <div>
        title{" "}
        <input
          value={title}
          type="text"
          placeholder="write title here"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author{" "}
        <input
          value={author}
          type="text"
          placeholder="write author here"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url{" "}
        <input
          value={url}
          type="text"
          placeholder="write url here"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button onClick={handleCreate}>create</button>
      </div>
    </div>
  );
};

export default BlogEditor;
