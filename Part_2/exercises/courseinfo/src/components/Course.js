const Course = ({ course }, key) => {
  const parts = course.parts; //Destructure parts array to make mapping easier
  console.log("list of props, ", course);
  console.log("Parts of Course: ", parts);

  const getExercises = (parts) => {
    const initial = 0;
    let total = parts.reduce(
      (accumulator, current) => accumulator + current.exercises,
      initial //initialized variable needed, otherwise starts storing the data as strings
    );
    // parts.forEach((part) => {
    //   total += part.exercises;
    // });

    // for (let i = 0; i < parts.length; i++) {
    //   console.log(parts.exercises);
    //   total = total + parts[i].exercises;
    // }
    return total;
  };

  const Header = ({ title }) => {
    return <h1>{title.name}</h1>;
  };

  const Total = ({ sum }) => <b>Number of exercises {sum}</b>;

  const Part = (
    { part },
    key //!key should not be listed as a prop, console returns undefined
  ) => (
    <li key={key}>
      {" "}
      {part.name} {part.exercises}
    </li>
  );

  const Content = ({ partsList }) => (
    <ul>
      {partsList.map((part) => (
        <Part part={part} key={part.id}></Part>
      ))}
    </ul>

    // <>
    //   <Part part={partsList[0]} />
    //   <Part part={partsList[1]} />
    //   <Part part={partsList[2]} />
    // </>
  );
  return (
    <div>
      <Header title={course} />
      <Content partsList={parts} />
      <Total sum={getExercises(parts)} />
    </div>
  );
};

export default Course;
