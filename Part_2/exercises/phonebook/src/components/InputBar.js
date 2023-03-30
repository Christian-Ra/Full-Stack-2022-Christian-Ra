const InputBar = ({ input, eventHandler }) => {
  return (
    <div>
      <input value={input} onChange={eventHandler}></input>
    </div>
  );
};

export default InputBar;
