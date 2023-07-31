import Button from "./components/Button";
import Display from "./components/Display";

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type={"INC"} label={"+"} />
        <Button type={"DEC"} label={"-"} />
        <Button type={"ZERO"} label={"0"} />
        {/* <button onClick={() => counterDispatch({ type: "INC" })}>+</button>
        <button onClick={() => counterDispatch({ type: "DEC" })}>-</button>
      <button onClick={() => counterDispatch({ type: "ZERO" })}>0</button> */}
      </div>
    </div>
  );
};

export default App;
