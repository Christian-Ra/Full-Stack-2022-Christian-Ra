import { useQueryClient, useMutation } from "react-query";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueriesData("anecdotes");
      console.log(anecdotes);
      // queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      //idk why the heck i have to add to the list this way but whatever it works lol
      queryClient.setQueryData(
        "anecdotes",
        anecdotes[0][1].concat(newAnecdote)
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, id: getId, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
