import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
  name: "notifs",
  initialState: null,
  reducers: {
    setNotif(state, action) {
      state = action.payload;
      return state;
    },
    resetNotif(state, action) {
      state = null;
      return state;
    },
  },
});

export const { setNotif, resetNotif } = notifSlice.actions;

export const setNotifWithTimeout = (notif, timeout) => {
  return (dispatch) => {
    dispatch(setNotif(notif));

    setTimeout(() => {
      dispatch(resetNotif());
    }, timeout);
  };
};
export default notifSlice.reducer;
