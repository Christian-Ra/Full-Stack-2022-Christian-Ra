import { useState } from 'react'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [blogView, toggleBlogView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    verticalAlign: 'center',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      <div style={blogStyle} className="shownBlogInfo">
        {blog.title} : {blog.author}
        <br></br>
        <button onClick={() => toggleBlogView(!blogView)}>
          {blogView ? 'Hide' : 'Show'}
        </button>
        {blogView && (
          <div className="hiddenBlogInfo">
            {blog.url}
            <p>
              Likes {blog.likes}
              <button onClick={like}>Like</button>
            </p>
            {blog.user.name}
            {blog.user.username === user.username && (
              <div>
                <button onClick={deleteBlog}>Delete Blog</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
