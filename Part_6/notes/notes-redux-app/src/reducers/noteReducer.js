//! the reducer we have declared here is bad because it breaks the basic assumption that reducers are PURE functions
const noteReducer = (state = [], action) => {
  // if (action.type === "NEW_NOTE") {
  //   state.push(action.payload);
  //   return state;
  // }

  //*The below function solves the issue of immutableness by using the concat method
  //*which creates a new array, which contains all the elements of the old array and the new element
  //   if (action.type === "NEW_NOTE") {

  //     return state.concat(action.payload);
  //   }
  //? A reducer state must be composed of immutable objects. If there is a change in the state, the old
  //? object is not changed, but it is replaced with a new, changed, object.

  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE": {
      const id = action.payload.id;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    }
    default:
      return state;
  }
};

export default noteReducer;
