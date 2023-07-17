import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

const App = () => {
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [isSuccessfulAction, setAction] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const timeOut = 5000

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      console.log(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.name} successfully logged in`)
      setAction(true)
      setTimeout(() => {
        setNotification(null)
      }, timeOut)
    } catch (exception) {
      setNotification('Invalid Credentials')
      setAction(false)
      setTimeout(() => {
        setNotification(null)
      }, timeOut)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setNotification(`${user.name} successfully logged out`)
    setAction(true)
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setTimeout(() => {
      setNotification(null)
    }, timeOut)
  }

  const addLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('updated blog', updatedBlog)
    const returnedBlog = await blogService.addLike(id, updatedBlog)
    console.log('blug upon running post: ', returnedBlog)
    setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)))
    // blogService.addLike(id, updatedBlog).then((returnedBlog) => {
    //   console.log(returnedBlog);
    //   setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)));
    // });
    setNotification(`Liked ${blog.title} by ${blog.author}`)
    setAction(true)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(
          `A new blog, ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setAction(true)
        setTimeout(() => {
          setNotification(null)
        }, timeOut)
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setNotification(
          'Blog creation failed, please ensure a valid title and URL are included'
        )
        setAction(false)
        setTimeout(() => {
          setNotification(null)
        }, timeOut)
      })
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== id))
      setAction(true)
      setNotification('Blog successfully removed')
      setTimeout(() => {
        setNotification(null)
      }, timeOut)
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            className="open-login-button"
            onClick={() => setLoginVisible(true)}
          >
            Log In
          </button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const sortedBlogs = () => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification}
        successAction={isSuccessfulAction}
      ></Notification>
      {!user && loginForm()}
      {user && (
        <div>
          <p className="user-signed-in">{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {sortedBlogs().map((blog) => (
            // eslint-disable-next-line react/jsx-key
            <div data-cy="blog-list">
              <Blog
                key={blog.id}
                blog={blog}
                like={() => addLike(blog.id)}
                deleteBlog={() => deleteBlog(blog.id)}
                user={user}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// window.onunload = () => {
//   window.localStorage.removeItem('loggedBlogAppUser')
// }

export default App
