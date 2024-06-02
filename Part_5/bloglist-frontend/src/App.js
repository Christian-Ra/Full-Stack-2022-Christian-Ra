import { useState, useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryBlogs } from './services/blogs'

import { useNotifDispatch } from './NotificationContext'
import { useUserDispatch, useUserValue } from './UserContext'

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
  const userDispatch = useUserDispatch()
  // const queryClient = useQueryClient()

  // const [blogs, setBlogs] = useState([])
  const [isSuccessfulAction, setAction] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const timeOut = 5000
  const contextUser = useUserValue()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: queryBlogs,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      blogService.setToken(user.token)
    }
  }, [])
  console.log('result', result)

  // console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    console.log('data loading')
    return <div>data is loading...</div>
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
      // setUser(user)
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
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
      // payload: `${user.name} successfully logged out`,
      payload: `${contextUser.name} successfully logged out`,
    })
    setAction(true)
    // setUser(null)
    userDispatch({
      type: 'LOGOUT_USER',
    })
    window.localStorage.removeItem('loggedBlogAppUser')
    setTimeout(() => {
      dispatch({ type: 'RESET_NOTIF' })
    }, timeOut)
  }

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
    return qblogs.toSorted((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification successAction={isSuccessfulAction}></Notification>
      {!contextUser && loginForm()}
      {contextUser && (
        <div>
          <p className="user-signed-in">{contextUser.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {sortedBlogs().map((blog) => (
            // eslint-disable-next-line react/jsx-key
            <div data-cy="blog-list">
              <Blog key={blog.id} blog={blog} user={contextUser} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
