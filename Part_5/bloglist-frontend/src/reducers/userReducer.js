import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import blogService from '../services/blogs'
import { setNotifWithTimeout } from './notifReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await userService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(
        setNotifWithTimeout(`${user.name} successfully logged in`, true, 5000)
      )

      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotifWithTimeout('Invalid Credentials', false, 5000))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null))
  }
}

export const loginWithToken = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
