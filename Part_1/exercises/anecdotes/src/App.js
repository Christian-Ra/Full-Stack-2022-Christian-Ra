import { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Votes = (props) => {
  const count = props.count;
  return (
    <div>
      <p>Has {count} Votes</p>
    </div>
  );
};

const MostVoted = (props) => {
  const most = props.anecdotes[props.mV];
  console.log("most: " + most);
  return (
    <div>
      <p>{most}</p>
      <p>Has {props.votes[props.mV]} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const votes = new Array(anecdotes.length).fill(0);
  const [anecdoteVotes, setVotes] = useState(votes);
  const [selected, setSelected] = useState(0);

  const setRandom = () => {
    const newEntry = getRandomInt(anecdotes.length);
    if (newEntry === selected) {
      return setRandom();
    }
    console.log("anecdote selected = " + newEntry);
    setSelected(newEntry);
  };

  const countVotes = () => {
    const updateList = [...anecdoteVotes];
    updateList[selected] = ++updateList[selected];
    setVotes(updateList);
    getMostVoted();
  };

  const getMostVoted = () => {
    let most = 0;
    for (let i = 0; i < anecdotes.length - 2; ++i) {
      console.log(anecdoteVotes[i], anecdoteVotes[most]);
      if (anecdoteVotes[i] > anecdoteVotes[most]) {
        most = i;
      }
    }
    console.log(anecdotes[most], anecdoteVotes[most]);
    return most;
  };

  const entry = anecdotes[selected];
  console.log(anecdoteVotes);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {entry}
      <Votes count={anecdoteVotes[selected]}></Votes>
      <Button handleClick={setRandom} text="New Entry"></Button>
      <Button handleClick={countVotes} text="Vote"></Button>
      <h1>Anecdote with most votes</h1>
      <MostVoted
        anecdotes={anecdotes}
        votes={anecdoteVotes}
        mV={getMostVoted()}
      />
    </div>
  );
};

export default App;
