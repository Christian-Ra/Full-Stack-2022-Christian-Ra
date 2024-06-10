import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useUserDispatch } from '../UserContext'
import { useNavigate } from 'react-router-dom'
import { useNotifDispatch } from '../NotificationContext'
import { Input, Button, Box } from '@chakra-ui/react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [loginVisible, setLoginVisible] = useState(false)
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
  // const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  // const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <h1>Blogs App</h1>

      <Box
        height={'50%'}
        width={'30%'}
        position={'absolute'}
        margin={'200px 0px'}
        // top={'25%'}
        left={'35%'}
      >
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              Username
              <Input
                id="username"
                value={username}
                m={'4px'}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password
              <Input
                id="password"
                type="password"
                value={password}
                m={'4px'}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button m={'10px 0px'} className="login-button" type="submit">
              Log in
            </Button>
          </form>
        </div>
      </Box>
    </div>
  )
}

export default LoginForm
