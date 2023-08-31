/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notifs',
  initialState: { content: null },
  reducers: {
    setNotif(state, action) {
      state.content = action.payload.content
      return state
    },
    resetNotif(state, action) {
      state.content = null
      return state
    },
  },
})

export const { setNotif, resetNotif } = notifSlice.actions

export const setNotifWithTimeout = (notif, timeout) => {
  return (dispatch) => {
    dispatch(setNotif({ content: notif }))
    console.log('DISPATCH FIRED!')
    setTimeout(() => {
      dispatch(resetNotif())
    }, timeout)
  }
}

export default notifSlice.reducer
