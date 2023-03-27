const Course = ({ course }) => {
  const parts = course.parts;
  console.log("list of props, ", course);
  console.log("Parts of Course: ", parts);

  const Header = ({ title }) => {
    return <h1>{title.name}</h1>;
  };

  const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

  const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );

  const Content = ({ partsList }) => (
    <>
      <Part part={partsList[0]} />
      <Part part={partsList[1]} />
      <Part part={partsList[2]} />
    </>
  );
  return (
    <div>
      <Header title={course} />
      <Content partsList={parts} />
      <Total
        sum={parts[0].exercises + parts[1].exercises + parts[2].exercises}
      />
    </div>
  );
};

export default Course;
