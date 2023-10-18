const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ course }) => {
  let total = course.parts.map(x => x.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ course }) => {
  return(
    <>
    {course.parts.map(part=><Part part={part} key={part.id}></Part>)}
    </>)
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <>
      {courses.map(course=><Course course={course} key={course.id}></Course>)}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    <h1>Web development curriculum</h1>
    <Courses courses={courses} />
    </>
    )
}

export default App