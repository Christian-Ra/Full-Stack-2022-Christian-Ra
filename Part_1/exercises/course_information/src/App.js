const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.exercise} {props.count}
      </p>
    </div>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part
        exercise={props.info.parts[0].name}
        count={props.info.parts[0].exercises}
      />
      <Part
        exercise={props.info.parts[1].name}
        count={props.info.parts[1].exercises}
      />
      <Part
        exercise={props.info.parts[2].name}
        count={props.info.parts[2].exercises}
      />
    </div>
  );
};

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.info.parts[0].exercises +
          props.info.parts[1].exercises +
          props.info.parts[2].exercises}
      </p>
      aaaaaaaaaaaaaa
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name}></Header>
      <Content info={course} />
      <Total info={course} />
    </div>
  );
};

export default App;
