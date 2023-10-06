import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogReducer, { setBlogs } from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import blogService from './services/blogs'

const store = configureStore({
  reducer: {
    notifs: notifReducer,
    blogs: blogReducer,
    users: userReducer,
  },
})

blogService.getAll().then((blogs) => store.dispatch(setBlogs(blogs)))

export default store
