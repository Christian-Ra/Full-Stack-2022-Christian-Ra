import { useUserValue, useUserDispatch } from '../UserContext'
import { Link } from 'react-router-dom'
import { Button, Box } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useNotifDispatch } from '../NotificationContext'

const NavBar = () => {
  const notifDispatch = useNotifDispatch()
  const userDispatch = useUserDispatch()
  const user = useUserValue()

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
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-around'}
      bg={'tomato'}
      w={'100%'}
      p={4}
      color={'white'}
    >
      <ChakraLink as={Link} to={'/'}>
        Blogs
      </ChakraLink>{' '}
      <ChakraLink as={Link} to={'/users'}>
        Users
      </ChakraLink>{' '}
      {user.name} logged in{' '}
      <Button
        colorScheme="gray"
        color={'black'}
        variant={'ghost'}
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </Box>
  )
}

export default NavBar
