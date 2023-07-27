import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      //ids now generated automatically through the backend
      state.push(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      // vvv This will pring junk from the Immer library featured in the redux toolkit
      console.log(state);

      console.log(JSON.parse(JSON.stringify(state)));

      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

//! vvvvvvvvvvv createSlice from redux toolkit refactors below code vvvvvvvvvvv

//! the reducer we have declared here is bad because it breaks the basic assumption that reducers are PURE functions
// const noteReducer = (state = initialState, action) => {
//   // if (action.type === "NEW_NOTE") {
//   //   state.push(action.payload);
//   //   return state;
//   // }

//   //*The below function solves the issue of immutableness by using the concat method
//   //*which creates a new array, which contains all the elements of the old array and the new element
//   //   if (action.type === "NEW_NOTE") {

//   //     return state.concat(action.payload);
//   //   }
//   //? A reducer state must be composed of immutable objects. If there is a change in the state, the old
//   //? object is not changed, but it is replaced with a new, changed, object.

//   switch (action.type) {
//     case "NEW_NOTE":
//       return [...state, action.payload];
//     case "TOGGLE_IMPORTANCE": {
//       const id = action.payload.id;
//       const noteToChange = state.find((n) => n.id === id);
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       };
//       return state.map((note) => (note.id !== id ? note : changedNote));
//     }
//     default:
//       return state;
//   }
// };

// export const toggleImportanceOf = (id) => {
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     payload: { id },
//   };
// };

// export const createNote = (content) => {
//   return {
//     type: "NEW_NOTE",
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;
export default noteSlice.reducer;
