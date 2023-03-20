import { useState } from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // * Event Handlers * //
  const handleGoodClick = () => {
    const updatedClick = good + 1;
    //console.log(updatedClick);
    setGood(updatedClick);
  };
  const handleNeutralClick = () => {
    const updatedClick = neutral + 1;
    //console.log(updatedClick);
    setNeutral(updatedClick);
  };
  const handleBadClick = () => {
    const updatedClick = bad + 1;
    //console.log(updatedClick);
    setBad(updatedClick);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good"></Button>
      <Button handleClick={handleNeutralClick} text="Neutral"></Button>
      <Button handleClick={handleBadClick} text="Bad"></Button>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  );
};

export default App;
