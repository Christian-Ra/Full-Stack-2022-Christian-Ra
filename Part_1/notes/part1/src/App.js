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

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);
  const decreaseByOne = () => setCounter(counter - 1);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  );
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
};

export default App;
