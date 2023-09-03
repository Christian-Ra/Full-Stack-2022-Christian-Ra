import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeBlog(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const updatedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs, likeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const addLikeBlog = (id, blog) => {
  return async (dispatch) => {
    const blogToUpdate = await blogService.addLike(id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(likeBlog(blogToUpdate.id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
