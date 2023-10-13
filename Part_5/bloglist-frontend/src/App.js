import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryBlogs } from './services/blogs'
import { useNotifDispatch } from './NotificationContext'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useNotifDispatch()

  const [blogs, setBlogs] = useState([])
  const [isSuccessfulAction, setAction] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const timeOut = 5000

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: queryBlogs,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    console.log('data loading')
  }

  const qblogs = result.data
  console.log('query data: ', qblogs)

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
      setAction(true)
      dispatch({
        type: 'SET_NOTIF',
        payload: `${user.name} successfully logged in`,
      })
      setTimeout(() => {
        dispatch({ type: 'RESET_NOTIF' })
      }, timeOut)
    } catch (exception) {
      dispatch({ type: 'SET_NOTIF', payload: 'Invalid login credentials ' })
      setTimeout(() => {
        dispatch({ type: 'RESET_NOTIF' })
      }, timeOut)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch({
      type: 'SET_NOTIF',
      payload: `${user.name} successfully logged out`,
    })
    setAction(true)
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setTimeout(() => {
      dispatch({ type: 'RESET_NOTIF' })
    }, timeOut)
  }

  const addLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.addLike(id, updatedBlog)
    setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)))
    dispatch({
      type: 'SET_NOTIF',
      payload: `Liked ${blog.title} by ${blog.author}`,
    })
    setAction(true)
    setTimeout(() => {
      dispatch({ type: 'RESET_NOTIF' })
    }, timeOut)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch({
          type: 'SET_NOTIF',
          payload: `A new blog, ${returnedBlog.title} by ${returnedBlog.author} added`,
        })
        setAction(true)
        setTimeout(() => {
          dispatch({ type: 'RESET_NOTIF' })
        }, timeOut)
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        dispatch({
          type: 'SET_NOTIF',
          payload:
            'Blog creation failed, please ensure a valid title and URL are included',
        })
        setAction(false)
        setTimeout(() => {
          dispatch({ type: 'RESET_NOTIF' })
        }, timeOut)
      })
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== id))
      setAction(true)
      dispatch({ type: 'SET_NOTIF', payload: 'Blog successfully removed' })
      setTimeout(() => {
        dispatch({ type: 'RESET_NOTIF' })
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
    return blogs.toSorted((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification successAction={isSuccessfulAction}></Notification>
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
