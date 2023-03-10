const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old!
      </p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;
  return (
    <div>
      <p>Greetings</p>
      <Hello name="Chris" age={26 - 4} />
      <Hello name={name} age={age} />
      <Hello name="Crusty" />
    </div>
  );
};

export default App;
