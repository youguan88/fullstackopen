import { HeaderProps, ContentProps, TotalProps } from "./types";
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  const Header = (props: HeaderProps) => {
    return (
      <h1>{props.name}</h1>
    )
  }

  const Content = (props: ContentProps) =>
    props.courseParts.map((coursePart) => {
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}
        </p>)
    })

  const Total = (props: TotalProps) => (
    <p>
      Number of exercises {props.totalExercises}
    </p>
  )

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App;