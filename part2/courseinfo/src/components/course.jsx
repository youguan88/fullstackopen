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
    return (
        <>
            {course.parts.map(part => <Part part={part} key={part.id}></Part>)}
        </>)
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course