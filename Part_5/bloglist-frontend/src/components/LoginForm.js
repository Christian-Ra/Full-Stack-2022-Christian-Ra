import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useUserDispatch } from '../UserContext'
import { useNavigate } from 'react-router-dom'
import { useNotifDispatch } from '../NotificationContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const userDispatch = useUserDispatch()
  const notifDispatch = useNotifDispatch()
  const navigate = useNavigate()
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
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      setUsername('')
      setPassword('')
      notifDispatch({
        type: 'SET_NOTIF',
        payload: `${user.name} successfully logged in`,
      })
      setTimeout(() => {
        notifDispatch({ type: 'RESET_NOTIF' })
      }, timeOut)
      navigate('/')
    } catch (exception) {
      notifDispatch({
        type: 'SET_NOTIF',
        payload: 'Invalid login credentials ',
      })
      setTimeout(() => {
        notifDispatch({ type: 'RESET_NOTIF' })
      }, timeOut)
    }
  }
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <h1>Blogs App</h1>
      <div style={hideWhenVisible}>
        <button
          className="open-login-button"
          onClick={() => setLoginVisible(true)}
        >
          Log In
        </button>
      </div>
      <div style={showWhenVisible}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className="login-button" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
