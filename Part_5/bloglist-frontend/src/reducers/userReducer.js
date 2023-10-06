import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import { setNotifWithTimeout } from './notifReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
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

export default userSlice.reducer
