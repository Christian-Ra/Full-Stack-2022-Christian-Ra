import { useState } from "react";

const Blog = ({ blog }) => {
  const [blogView, toggleBlogView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    verticalAlign: "center",
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div>
      <div style={blogStyle}>
        {blog.title} : {blog.author}
        <br></br>
        <button onClick={() => toggleBlogView(!blogView)}>
          {blogView ? "Hide" : "Show"}
        </button>
        {blogView && (
          <div>
            {blog.url}
            <p>
              Likes {blog.likes}
              <button onClick={() => console.log("Click!")}>Like</button>
            </p>
            {blog.user.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
