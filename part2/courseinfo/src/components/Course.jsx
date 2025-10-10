const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ total }) => <strong>total of {total} exercises</strong>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => <div>{parts.map((part) => <Part key={part.id} part={part} />)}</div>

const Course = ({ course }) => {
    const total = course.parts.reduce((total, part) => total + part.exercises, 0)

    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </>)
}

export default Course