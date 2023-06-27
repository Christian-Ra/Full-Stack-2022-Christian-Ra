import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button type='submit'>Add Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
