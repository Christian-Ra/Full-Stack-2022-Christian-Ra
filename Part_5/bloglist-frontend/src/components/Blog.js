import PropTypes from 'prop-types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addLike, deleteBlog, addComment } from '../services/blogs'
import { useNotifDispatch } from '../NotificationContext'
import { useUserValue } from '../UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useNotifDispatch()
  const queryClient = useQueryClient()
  const user = useUserValue()

  const [comment, setComment] = useState('')

  if (!blog) return null

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      // queryClient.invalidateQueries(['blogs'])
      // console.log('id used to filter', id)
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== blog.id)
      )
      dispatch({
        type: 'SET_NOTIF',
        payload: 'Blog successfully removed',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET_NOTIF' })
      }, 5000)
      navigate('/')
    },
    onError: (error) => {
      console.log('error mutation triggered')
      dispatch({ type: 'SET_NOTIF', payload: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'RESET_NOTIF' })
      }, 5000)
    },
  })

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

  const commentMutation = useMutation(addComment, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogs = blogs.map((b) =>
        b.id !== updatedBlog.id ? b : updatedBlog
      )
      queryClient.setQueryData(['blogs'], newBlogs)
      dispatch({
        type: 'SET_NOTIF',
        payload: 'Saved Comment',
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

  const removeBlog = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      try {
        deleteBlogMutation.mutate(blog.id)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const commentBlog = (event) => {
    event.preventDefault()
    const commentToPost = { comment: comment, id: blog.id }
    setComment('')
    try {
      commentMutation.mutate(commentToPost)
    } catch (error) {
      console.log(error)
    }
  }

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
  console.log('type of blog: ', typeof blog)

  return (
    <div>
      <div data-cy="shown-blog-info">
        <h1>
          {' '}
          {blog.title} : {blog.author}{' '}
        </h1>
        <br></br>
        <div data-cy="hidden-blog-info">
          <a href={blog.url}>{blog.url}</a>
          <p data-cy="likes">
            Likes {blog.likes}
            <button data-cy="like-button" onClick={likeBlog}>
              Like
            </button>
          </p>
          added by {blog.user.name}
          {blog.user.username === user.username && (
            <div>
              <button data-cy="delete-blog-button" onClick={removeBlog}>
                Delete Blog
              </button>
            </div>
          )}
          <h3>Comments</h3>
          <input
            data-cy="comment-input"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Add Comment"
          />
          <button onClick={commentBlog}>Add Comment</button>
          {blog.comments.map((c) => (
            // eslint-disable-next-line react/jsx-key
            <ul>
              <li>{c}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
