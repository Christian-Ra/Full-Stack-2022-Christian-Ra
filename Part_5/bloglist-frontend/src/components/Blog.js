import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotifWithTimeout } from '../reducers/notifReducer'
import { addLikeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const timeOut = 5000
  const [blogView, setBlogView] = useState(false)
  const dispatch = useDispatch()
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

  const addLike = () => {
    dispatch(addLikeBlog(blog.id, blog))
    dispatch(
      setNotifWithTimeout(
        `Liked ${blog.title} by ${blog.author}`,
        true,
        timeOut
      )
    )
  }

  const deleteBlogAction = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(
      setNotifWithTimeout(
        `Deleted blog ${blog.title} by ${blog.author}`,
        true,
        timeOut
      )
    )
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
              <button data-cy="like-button" onClick={addLike}>
                Like
              </button>
            </p>
            {blog.user.name}
            {blog.user.username === user.username && (
              <div>
                <button data-cy="delete-blog-button" onClick={deleteBlogAction}>
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
  blog: PropTypes.object.isRequired,
}

export default Blog
