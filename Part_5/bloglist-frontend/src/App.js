import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState("");
  const [isSuccessfulAction, setAction] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const timeOut = 5000;

  const clearBlogFields = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      console.log(user.token);
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification(`${user.name} successfully logged in`);
      setAction(true);
      setTimeout(() => {
        setNotification(null);
      }, timeOut);
    } catch (exception) {
      setNotification("Invalid Credentials");
      setAction(false);
      setTimeout(() => {
        setNotification(null);
      }, timeOut);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    setNotification(`${user.name} successfully logged out`);
    setAction(true);
    setUser(null);
    window.localStorage.removeItem("loggedNoteAppUser");
    setTimeout(() => {
      setNotification(null);
    }, timeOut);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: Math.round(Math.random() * 10),
    };
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNotification(
          `A new blog, ${returnedBlog.title} by ${returnedBlog.author} added`
        );
        setAction(true);
        clearBlogFields();
        setTimeout(() => {
          setNotification(null);
        }, timeOut);
      })
      .catch((error) => {
        setNotification(
          "Invalid blog created, please include title/url when creating blog"
        );
        setAction(false);
        setTimeout(() => {
          setNotification(null);
        }, timeOut);
      });
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='text'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const blogCreationForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <h2>Create New Blog</h2>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      </div>
      <button type='submit'>Create Blog</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification}
        successAction={isSuccessfulAction}
      ></Notification>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogCreationForm()}
          {blogs.map((blog) => (
            <div>
              <Blog key={blog.id} blog={blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

window.onunload = () => {
  window.Storage.clear();
};

export default App;
