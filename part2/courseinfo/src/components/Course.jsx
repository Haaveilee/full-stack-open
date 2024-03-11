const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <div>
            {props.course.parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
        </div>
    )
}

const Total = (props) => {
    const exercises = props.course.parts.map(part => part.exercises)
    const sum = exercises.reduce((partialSum, a) => partialSum + a, 0);

    return (
        <div>
            <b>
                Total of {sum} exercises
            </b>
        </div>
    )
}

const Course = ({course}) => {

    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default Course