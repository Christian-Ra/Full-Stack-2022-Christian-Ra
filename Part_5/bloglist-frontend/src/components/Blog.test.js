import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not URL or likes', () => {
  const blog = {
    title: 'This is a test blog',
    author: 'John Doe',
    url: 'somerandomsite.com',
    likes: 0,
  }

  render(<Blog blog={blog} />)

  const blogTitle = screen.getByText(`${blog.title} : ${blog.author}`)
  const blogSecondaryInfo = screen.queryByText(`${blog.url} ${blog.likes}`)
  // instead of raising error queryBytext returns null if elements are not found
  expect(blogTitle).toBeDefined()
  expect(blogSecondaryInfo).toBeNull()
})

test('renders likes and url upon clicking show button', async () => {
  const blog = {
    title: 'This is a test blog',
    author: 'John Doe',
    url: 'somerandomsite.com',
    user: {
      username: 'crustyRazor',
      name: 'christian razo',
    },
    likes: 0,
  }
  const user = {
    username: 'crustyRazor',
    name: 'christian razo',
  }

  render(<Blog blog={blog} user={user} />)

  const player = userEvent.setup()
  const blogHiddenInfo = screen.queryByText(`${blog.url} ${blog.likes}`)
  expect(blogHiddenInfo).toBeNull()

  const button = screen.getByText('Show')
  await player.click(button)

  const blogShownInfo = screen.findByText(`${blog.url} ${blog.likes}`)
  expect(blogShownInfo).toBeDefined()
})

test('Like button can be clicked twice and returns the proper amount of function calls', async () => {
  const blog = {
    title: 'This is a test blog',
    author: 'John Doe',
    url: 'somerandomsite.com',
    user: {
      username: 'crustyRazor',
      name: 'christian razo',
    },
    likes: 0,
  }
  const user = {
    username: 'crustyRazor',
    name: 'christian razo',
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} like={mockHandler} user={user} />)

  const player = userEvent.setup()
  const button = screen.getByText('Show')

  await player.click(button)

  const likeButton = screen.getByText('Like')
  await player.dblClick(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
