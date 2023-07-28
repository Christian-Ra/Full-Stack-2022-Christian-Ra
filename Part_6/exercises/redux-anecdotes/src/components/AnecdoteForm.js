import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotif, resetNotif } from "../reducers/notifReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    //runs into issue with async race conditions if multiple actions are
    //performed in rapid succession
    dispatch(createAnecdote(content));
    dispatch(setNotif(`a new anecdote: ${content}, was added`));
    setTimeout(() => {
      dispatch(resetNotif());
    }, 5000);
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdote' />
      <button type='submit'>Add Anecdote</button>
    </form>
  );
};

export default AnecdoteForm;
