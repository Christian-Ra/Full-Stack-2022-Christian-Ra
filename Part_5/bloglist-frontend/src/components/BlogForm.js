import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  // const blogFormRef = useRef()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    // blogFormRef.current.toggleVisibility()
    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
        likes: 0,
      })
    )
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            data-cy="blog-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter Title:"
          />
        </div>
        <div>
          Author:
          <input
            data-cy="blog-author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Enter Author:"
          />
        </div>
        <div>
          URL:
          <input
            data-cy="blog-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Enter URL:"
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default BlogForm
