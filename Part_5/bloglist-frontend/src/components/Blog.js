import PropTypes from 'prop-types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addLike, deleteBlog, addComment } from '../services/blogs'
import { useNotifDispatch } from '../NotificationContext'
import { useUserValue } from '../UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Input, Heading, Button, Box, Text } from '@chakra-ui/react'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useNotifDispatch()
  const queryClient = useQueryClient()
  const user = useUserValue()

  const [comment, setComment] = useState('')

  if (!blog) return null

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
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

  const boxStyle = {
    display: 'flex',
    width: '40%',
    position: 'absolute',
    left: '30%',
    flexDirection: 'column',
    paddingLeft: 2,
    verticalAlign: 'center',
    marginBottom: 5,
    justifyContent: 'center',
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

  return (
    <div>
      <div data-cy="shown-blog-info">
        <Heading textAlign={'center'}>
          {' '}
          {blog.title} : {blog.author}{' '}
        </Heading>
        <br></br>
        <Box style={boxStyle} data-cy="hidden-blog-info">
          <a
            style={{ maxWidth: 'fit-content', margin: '0px 0px 20px 0px' }}
            href={blog.url}
          >
            Click to View Blog
          </a>
          <Text data-cy="likes">
            Likes {blog.likes}
            <Button m={'5px 10px'} data-cy="like-button" onClick={likeBlog}>
              Like
            </Button>
          </Text>
          <Text>Added by {blog.user.name}</Text>
          {blog.user.username === user.username && (
            <div>
              <Button
                margin={'10px 10px'}
                colorScheme={'red'}
                data-cy="delete-blog-button"
                onClick={removeBlog}
              >
                Delete Blog
              </Button>
            </div>
          )}
          <h3>Comments</h3>
          <Input
            data-cy="comment-input"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Add Comment"
          />
          <Button margin={'15px 0px'} padding={'8px'} onClick={commentBlog}>
            Add Comment
          </Button>
          {blog.comments.map((c) => (
            // eslint-disable-next-line react/jsx-key
            <ul>
              <li>{c}</li>
            </ul>
          ))}
        </Box>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
