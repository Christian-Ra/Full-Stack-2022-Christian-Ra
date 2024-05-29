import { useState } from 'react'
import PropTypes from 'prop-types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addLike } from '../services/blogs'
import { useNotifDispatch } from '../NotificationContext'

const Blog = ({ blog, deleteBlog, user }) => {
  const [blogView, setBlogView] = useState(false)
  const dispatch = useNotifDispatch()
  const queryClient = useQueryClient()
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

  const likeBlogMutation = useMutation(addLike, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogs = blogs.map((b) =>
        b.id !== updatedBlog.id ? b : updatedBlog
      )
      queryClient.setQueryData(['blogs'], newBlogs)
      dispatch({
        type: 'SET_NOTIF',
        payload: `Liked ${updatedBlog.title} by ${updatedBlog.author}`,
      })
      setTimeout(() => {
        dispatch({ type: 'RESET_NOTIF' })
      }, 5000)
    },
    onError: (error) => {
      console.log('error mutation triggered')
      dispatch({ type: 'SET_NOTIF', payload: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'RESET_NOTIF' })
      }, 5000)
    },
  })

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(
      'updated blog: ',
      updatedBlog,
      ' updated likes: ',
      updatedBlog.likes
    )
    try {
      likeBlogMutation.mutate(updatedBlog)
    } catch (error) {
      console.log(error)
    }
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
              <button data-cy="like-button" onClick={likeBlog}>
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
  blog: PropTypes.object.isRequired,
}

export default Blog
