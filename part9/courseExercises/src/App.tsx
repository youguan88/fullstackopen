import { HeaderProps, ContentProps, TotalProps, CoursePart } from "./types";
const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const Header = (props: HeaderProps) => {
    return (
      <h1>{props.name}</h1>
    )
  }

  const Part = (props: ContentProps) => {
    return (
      props.courseParts.map((coursePart) => {
        let content = null
        switch (coursePart.kind) {
          case "basic":
            content = (
              <div>
                <div><b>{coursePart.name} {coursePart.exerciseCount} </b></div>
                <div><i>{coursePart.description}</i></div>
                <br></br>
              </div>
            )
            break;
          case "group":
            content = (
              <div>
                <div><b>{coursePart.name} {coursePart.exerciseCount} </b></div>
                <div> project exercises {coursePart.groupProjectCount}</div>
                <br></br>
              </div>)
            break;
          case "background":
            content = (
              <div>
                <div><b>{coursePart.name} {coursePart.exerciseCount} </b></div>
                <div><i>{coursePart.description}</i></div>
                <div> submit to {coursePart.backgroundMaterial} </div>
                <br></br>
              </div>
            )
            break;
          case "special":
            content = (
              <div>
                <div><b>{coursePart.name} {coursePart.exerciseCount} </b></div>
                <div><i>{coursePart.description}</i></div>
                <div>required skills: {coursePart.requirements.join(', ')}</div>
                <br></br>

              </div>
            )
            break;
          default:
            assertNever(coursePart);
        }
        return content
      })
    )
  }

  const Content = (props: ContentProps) => {
    return (
      <Part courseParts={props.courseParts} />
    )
  }

  const Total = (props: TotalProps) => (
    <p>
      Number of exercises {props.totalExercises}
    </p>
  )

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;