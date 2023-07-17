import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [blogView, setBlogView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    verticalAlign: 'center',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleBlogView = () => {
    setBlogView(!blogView)
  }

  return (
    <div>
      <div
        data-cy="shown-blog-info"
        style={blogStyle}
        className="shownBlogInfo"
      >
        {blog.title} : {blog.author}
        <br></br>
        <button data-cy="toggle-blog-button" onClick={toggleBlogView}>
          {blogView ? 'Hide' : 'Show'}
        </button>
        {blogView && (
          <div data-cy="hidden-blog-info" className="hiddenBlogInfo">
            {blog.url}
            <p data-cy="likes">
              Likes {blog.likes}
              <button data-cy="like-button" onClick={like}>
                Like
              </button>
            </p>
            {blog.user.name}
            {blog.user.username === user.username && (
              <div>
                <button data-cy="delete-blog-button" onClick={deleteBlog}>
                  Delete Blog
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog
