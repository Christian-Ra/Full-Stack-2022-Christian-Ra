import React from "react";
import ReactDOM from "react-dom/client";
// import { createStore, combineReducers } from "redux"; --no longer needed with redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// import { createNote } from "./reducers/noteReducer";
// import { filterChange } from "./reducers/filterReducer";
import App from "./App";

import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });
// const store = createStore(reducer);

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

console.log(store.getState());

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(filterChange("IMPORTANT"));
// store.dispatch(
//   createNote("combinedReducers forms one reducer from many simple reducers")
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <div />
//   </Provider>
// );
