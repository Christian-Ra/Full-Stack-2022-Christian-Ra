import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route, useMatch } from 'react-router-dom'

import { queryBlogs } from './services/blogs'
import { queryUsers } from './services/users'

import { useNotifDispatch } from './NotificationContext'
import { useUserDispatch, useUserValue } from './UserContext'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import HomePage from './components/HomePage'
import User from './components/User'

const App = () => {
  const dispatch = useNotifDispatch()
  const userDispatch = useUserDispatch()
  const [isSuccessfulAction, setAction] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const timeOut = 5000
  const contextUser = useUserValue()

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: queryBlogs,
    refetchOnWindowFocus: false,
  })

  const users = useQuery({
    queryKey: ['users'],
    queryFn: queryUsers,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      blogService.setToken(user.token)
    }
  }, [])
  console.log('result', blogs)

  if (blogs.isLoading || users.isLoading) {
    console.log('data loading')
    return <div>data is loading...</div>
  }

  const queriedblogs = blogs.data
  const queriedUsers = users.data
  console.log('query data: ', queriedblogs)
  console.log('users data: ', queriedUsers)

  const match = useMatch('/users/:id')
  const userPage = match
    ? queriedUsers.find((user) => user.id === String(match.params.id))
    : null

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
      payload: `${contextUser.name} successfully logged out`,
    })
    setAction(true)
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

  const sortedBlogs = () => {
    return queriedblogs.toSorted((a, b) => b.likes - a.likes)
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
          <Routes>
            <Route path="/users/:id" element={<User user={userPage} />} />
            {/* !!! Ordering of routes matters a lot, having the path '/' above '/users/ causes an error with hook calls */}
            <Route path="/users" element={<Users users={queriedUsers} />} />
            <Route path="/" element={<HomePage blogs={sortedBlogs()} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
