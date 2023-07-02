import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = await screen.getByPlaceholderText('Enter Title:')
  await user.type(titleInput, 'Testing the blog form')

  const authorInput = await screen.getByPlaceholderText('Enter Author:')
  await user.type(authorInput, 'Christian Razo')

  const urlInput = await screen.getByPlaceholderText('Enter URL:')
  await user.type(urlInput, 'testsite.com')

  const submitButton = await screen.getByText('Add Blog')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'Testing the blog form',
    author: 'Christian Razo',
    url: 'testsite.com',
    likes: 0,
  })
})
