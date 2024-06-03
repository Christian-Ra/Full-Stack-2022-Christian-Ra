import { useUserValue, useUserDispatch } from '../UserContext'
import { Link } from 'react-router-dom'
import { useNotifDispatch } from '../NotificationContext'

const NavBar = () => {
  const notifDispatch = useNotifDispatch()
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  const navBarStyle = {
    backgroundColor: 'gray',
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    notifDispatch({
      type: 'SET_NOTIF',
      payload: `${user.name} successfully logged out`,
    })
    userDispatch({
      type: 'LOGOUT_USER',
    })
    window.localStorage.removeItem('loggedBlogAppUser')
    setTimeout(() => {
      notifDispatch({ type: 'RESET_NOTIF' })
    }, 5000)
  }

  return (
    <div style={navBarStyle}>
      <Link to={'/'}>Blogs</Link> <Link to={'/users'}>Users</Link> {user.name}{' '}
      logged in <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default NavBar
