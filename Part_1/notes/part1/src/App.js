// const Hello = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <p>
//         Hello {props.name}, you are {props.age} years old!
//       </p>
//     </div>
//   );
// };

import { useState } from "react";

// !* PART 1.D code, A more complex state, debugging React Apps
const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};
const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    // console.log("left before", left); // *State updates asynchrously, with old
    // setLeft(left + 1);                // *value persisting despite updating the value
    // console.log("left After", left);  // *as a result, count button presses produces a
    // setTotal(left + right);           // *result that is one too small!
    // ! Fix for above error ^^^^
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };
  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
    setTotal(left + right);
  };

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
  );

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

// !* PART 1.C code, component state and event handlers *! //
// const Display = ({ counter }) => <div>{counter}</div>;

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>{text}</button>
// );

// const App = () => {
//   const [counter, setCounter] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1);
//   const setToZero = () => setCounter(0);
//   const decreaseByOne = () => setCounter(counter - 1);

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button handleClick={increaseByOne} text="plus" />
//       <Button handleClick={setToZero} text="zero" />
//       <Button handleClick={decreaseByOne} text="minus" />
//     </div>
//   );
// const name = "Peter";
// const age = 10;
// return (
//   <div>
//     <p>Greetings</p>
//     <Hello name="Chris" age={26 - 4} />
//     <Hello name={name} age={age} />
//     <Hello name="Crusty" />
//   </div>
// );
// };

export default App;
