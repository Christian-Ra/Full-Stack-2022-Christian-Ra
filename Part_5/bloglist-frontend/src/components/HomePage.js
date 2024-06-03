import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Toggleable'
import { Link } from 'react-router-dom'
// import Blog from './Blog'
// import { useUserValue } from '../UserContext'

const HomePage = ({ blogs }) => {
  const blogFormRef = useRef()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    verticalAlign: 'center',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  //   const user = useUserValue()

  const blogForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle} data-cy="blog-list">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default HomePage
