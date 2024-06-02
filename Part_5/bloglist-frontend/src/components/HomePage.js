import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Toggleable'
import Blog from './Blog'
import { useUserValue } from '../UserContext'

const HomePage = ({ blogs }) => {
  const blogFormRef = useRef()
  const user = useUserValue()

  const blogForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}
      {blogs.map((blog) => (
        <div key={blog.id} data-cy="blog-list">
          <Blog blog={blog} user={user} />
        </div>
      ))}
    </div>
  )
}

export default HomePage
