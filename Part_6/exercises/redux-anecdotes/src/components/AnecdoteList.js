import { useDispatch, useSelector } from "react-redux";
import { likeAnecdote } from "../reducers/anecdoteReducer";
import { setNotifWithTimeout } from "../reducers/notifReducer";

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
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote
            anecdote={anecdote}
            handleClick={() => {
              dispatch(likeAnecdote(anecdote.id, anecdote));
              dispatch(
                setNotifWithTimeout(`${anecdote.content} was upvoted!`, 2000)
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
