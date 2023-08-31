import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'

const store = configureStore({
  reducer: {
    notifs: notifReducer,
  },
})

export default store
