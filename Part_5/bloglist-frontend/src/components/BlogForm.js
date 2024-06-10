import { useState } from 'react'
// import { queryBlogs } from '../services/blogs'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createBlog } from '../services/blogs'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useNotifDispatch } from '../NotificationContext'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useNotifDispatch()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: (newBlog) => {
      // console.log('value of newBlog', newBlog)
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      dispatch({
        type: 'SET_NOTIF',
        payload: `a new blog: ${newBlog.title} by ${newBlog.author} was created`,
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogToAdd = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      comments: [],
    }
    setAuthor('')
    setTitle('')
    setUrl('')
    try {
      newBlogMutation.mutate(blogToAdd)
    } catch (error) {
      console.log(error)
    }
  }

  // const addBlog = (event) => {
  //   event.preventDefault()
  //   createBlog({
  //     title: title,
  //     author: author,
  //     url: url,
  //     likes: 0,
  //   })
  //   setAuthor('')
  //   setTitle('')
  //   setUrl('')
  // }
  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <Input
            data-cy="blog-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter Title:"
            color="teal"
            _placeholder={{ color: 'inherit' }}
          />
        </div>
        <div>
          Author:
          <Input
            data-cy="blog-author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Enter Author:"
            color="teal"
            _placeholder={{ color: 'inherit' }}
          />
        </div>
        <div>
          URL:
          <Input
            data-cy="blog-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Enter URL:"
            color="teal"
            _placeholder={{ color: 'inherit' }}
          />
        </div>
        <Button colorScheme="teal" type="submit">
          Add Blog
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
