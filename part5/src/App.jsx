import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogEditor from "./components/BlogEditor";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const hideWhenVisible = { display: newPostVisible ? "none" : "" };
  const showWhenVisible = { display: newPostVisible ? "" : "none" };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage(null);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={errorMessage} isError={true} />
      <Notification message={successMessage} isError={false} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <>
          <h2>blogs</h2>
          <div>
            {user.name} is logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </div>
          <div>
            <div style={hideWhenVisible}>
              <button onClick={() => setNewPostVisible(true)}>New Post</button>
            </div>
            <div style={showWhenVisible}>
              <BlogEditor
                createBlogPost={async (title, author, url) => {
                  try {
                    await blogService.create({ title, author, url });
                    setSuccessMessage("New blog post created");
                    setTimeout(() => {
                      setSuccessMessage(null);
                    }, 5000);

                    const blogs = await blogService.getAll();
                    setBlogs(blogs);
                  } catch (error) {
                    setErrorMessage("Failed to create blog post");
                    setTimeout(() => {
                      setErrorMessage(null);
                    }, 5000);
                  }
                }}
              />
              <button onClick={() => setNewPostVisible(false)}>cancel</button>
            </div>
          </div>
          {blogs
            .sort((a, b) => (a.likes < b.likes ? 1 : -1))
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likePost={(event) => {
                  event.preventDefault();
                  blogService.update(blog.id, {
                    ...blog,
                    likes: blog.likes + 1,
                  });
                }}
                removePost={(event) => {
                  event.preventDefault();
                  if (
                    window.confirm(
                      `Are you sure you want to remove ${blog.title}`
                    )
                  ) {
                    blogService.remove(blog.id);
                  }
                }}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
