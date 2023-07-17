import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = jest.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  //? getByRole only works for single input types, if multiple inputs were being tested
  //? the method getAllByRole would need to be invoked, which would return an array
  //? and the right input field as the first element of the array. This method relies
  //? on the order of input fields. A more reliable approach would be to use
  //? the methods getByPlaceHolderText or the querySelector of the container object
  //* const { container } = render(<NoteForm createNote={createNote} />)
  //* const input = container.querySelctor('#note-input')
  // const input = screen.getByRole('textbox')

  const sendButton = screen.getByPlaceholderText('write note content here')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
