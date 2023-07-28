import React from "react";
import ReactDOM from "react-dom/client";
// import { createStore, combineReducers } from "redux"; --no longer needed with redux toolkit
import { Provider } from "react-redux";
import store from "./store";

// import { createNote } from "./reducers/noteReducer";
// import { filterChange } from "./reducers/filterReducer";
import App from "./App";

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });
// const store = createStore(reducer);

//* Below code is a bit impractical, since multiple action calls are required
// noteService.getAll().then((notes) =>
//   notes.forEach((note) => {
//     store.dispatch(appendNote(note));
//   })
// );

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
