import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        Has {anecdote.votes}
        <button onClick={handleClick}>Vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote
            anecdote={anecdote}
            handleClick={() => dispatch(voteAnecdote(anecdote.id))}
          />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
