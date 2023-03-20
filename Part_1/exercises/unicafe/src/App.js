import { useState } from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const StatisticsLine = (props) => {
  const data = props.count;
  return (
    <div>
      <p>
        {props.text}: {data}
      </p>
    </div>
  );
};

const Statistics = (props) => {
  const good = props.goodCount,
    neutral = props.neutralCount,
    bad = props.badCount;
  const total = props.all;
  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No Feedback Given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <thead>
          <tr>
            <td>
              <StatisticsLine text="Good" count={good} />
            </td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>
              <StatisticsLine text="Neutral" count={neutral} />{" "}
            </td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>
              <StatisticsLine text="Bad" count={bad} />
            </td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>
              <StatisticsLine text="Total" count={total} />{" "}
            </td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>
              <StatisticsLine
                text="Average"
                count={good * 1 + (bad * -1) / total}
              />{" "}
            </td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>
              <StatisticsLine text="Percent Good" count={good / total} />
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  // * Event Handlers * //
  const handleGoodClick = () => {
    const updatedClick = good + 1;
    //console.log(updatedClick);
    setGood(updatedClick);
    setTotal(total + 1);
  };
  const handleNeutralClick = () => {
    const updatedClick = neutral + 1;
    //console.log(updatedClick);
    setNeutral(updatedClick);
    setTotal(total + 1);
  };
  const handleBadClick = () => {
    const updatedClick = bad + 1;
    //console.log(updatedClick);
    setBad(updatedClick);
    setTotal(total + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good"></Button>
      <Button handleClick={handleNeutralClick} text="Neutral"></Button>
      <Button handleClick={handleBadClick} text="Bad"></Button>
      <Statistics
        all={total}
        goodCount={good}
        neutralCount={neutral}
        badCount={bad}
      ></Statistics>
    </div>
  );
};

export default App;
