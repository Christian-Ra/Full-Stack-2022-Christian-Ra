import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Toggleable'
import { Link } from 'react-router-dom'
import { Box, Text, Heading } from '@chakra-ui/react'
// import Blog from './Blog'
// import { useUserValue } from '../UserContext'

const HomePage = ({ blogs }) => {
  const blogFormRef = useRef()
  const blogStyle = {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 2,
    verticalAlign: 'center',
    marginBottom: 5,
    justifyContent: 'center',
  }
  //   const user = useUserValue()

  const blogForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <Box
      position={'absolute'}
      alignContent={'center'}
      width={'50%'}
      left={'25%'}
      margin={'20px 20px'}
      style={blogStyle}
    >
      <Heading textAlign={'center'}>Blogs</Heading> {blogForm()}
      {blogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <Box
            // border={'solid'}
            alignItems={'center'}
            justifyContent={'center'}
            borderWidth={'2px'}
            borderRadius={'10px'}
            height={'40px'}
            m={'20px 0px'}
            width={'100%'}
            style={blogStyle}
            data-cy="blog-list"
          >
            <Text as={'em'}>{blog.title}</Text>
          </Box>
        </Link>
      ))}
    </Box>
  )
}

export default HomePage
