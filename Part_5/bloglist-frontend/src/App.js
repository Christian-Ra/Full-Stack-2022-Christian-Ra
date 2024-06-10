import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'

import { queryBlogs } from './services/blogs'
import { queryUsers } from './services/users'

import { useUserDispatch, useUserValue } from './UserContext'

import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import HomePage from './components/HomePage'
import User from './components/User'
import Blog from './components/Blog'
import NavBar from './components/NavBar'

const App = () => {
  const userDispatch = useUserDispatch()
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

  const queriedblogs = blogs.data
  const queriedUsers = users.data
  console.log('query data: ', queriedblogs)
  console.log('users data: ', queriedUsers)

  const userMatch = useMatch('/users/:id')
  const userPage =
    userMatch && queriedUsers //*need to ensure that query is complete before running check
      ? queriedUsers.find((user) => user.id === String(userMatch.params.id))
      : null

  const blogMatch = useMatch('/blogs/:id')
  const blogPage =
    blogMatch && queriedblogs
      ? queriedblogs.find((blog) => blog.id === String(blogMatch.params.id))
      : null

  //! Important note, do not place hooks after return statements
  if (blogs.isLoading || users.isLoading) {
    console.log('data loading')
    return <div>data is loading...</div>
  }

  const sortedBlogs = () => {
    return queriedblogs.toSorted((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <Notification successAction={true}></Notification>
      <div>
        {contextUser ? (
          <div>
            <NavBar />
          </div>
        ) : null}
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              contextUser ? (
                <Blog blog={blogPage} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/users/:id"
            element={
              contextUser ? (
                <User user={userPage} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          {/* !!! Ordering of routes matters a lot, having the path '/' above '/users/ causes an error with hook calls */}
          <Route
            path="/users"
            element={
              contextUser ? (
                <Users users={queriedUsers} />
              ) : (
                <Navigate replace to="login" />
              )
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              contextUser ? (
                <HomePage blogs={sortedBlogs()} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
