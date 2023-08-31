/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notifs',
  initialState: { content: null, type: null },
  reducers: {
    setNotif(state, action) {
      state.content = action.payload.content
      state.type = action.payload.type
      return state
    },
    resetNotif(state, action) {
      state.content = null
      return state
    },
  },
})

export const { setNotif, resetNotif } = notifSlice.actions

export const setNotifWithTimeout = (notif, type, timeout) => {
  return (dispatch) => {
    dispatch(setNotif({ content: notif, type: type }))
    setTimeout(() => {
      dispatch(resetNotif())
    }, timeout)
  }
}

export default notifSlice.reducer
