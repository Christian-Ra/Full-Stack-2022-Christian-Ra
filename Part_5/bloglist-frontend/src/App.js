/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'
import { setNotifWithTimeout } from './reducers/notifReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, loginUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const blogFormRef = useRef()
  const Blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const timeOut = 5000

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      dispatch(
        setNotifWithTimeout(
          `${user.name} successfully logged in`,
          true,
          timeOut
        )
      )
    } catch (exception) {
      dispatch(setNotifWithTimeout('Invalid Credentials', false, timeOut))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(setNotifWithTimeout('User successfully logged out', true, timeOut))
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      <BlogForm />
    </Togglable>
  )

  const sortedBlogs = () => {
    return Blogs.toSorted((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification></Notification>
      {!user && loginForm()}
      {user && (
        <div>
          <p className="user-signed-in">{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {sortedBlogs().map((blog) => (
            // eslint-disable-next-line react/jsx-key
            <div key={blog.id} data-cy="blog-list">
              <Blog blog={blog} user={user} />
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
