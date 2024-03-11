const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h1>Web Development Curriculum</h1>
        </div>
    )
}

const Title = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <div>
            <p>
                {props.name} {props.exercises}
            </p>
        </div>
    )
}

const Content2 = (props) => {
    //const titles = props.courses.map(courses => courses.name)
    //console.log(titles)
    const parts = props.courses.map(courses => courses.parts)
    console.log(parts)

    return (
        <div>
            {props.courses.map(courses => <Title key={courses.id} title={courses.name}/>
            )}
        </div>
        //{props.courses.parts.map(part => <Part key={part.id} part={part}/>)}
    )
}

const Content = (props) => {
    //{props.parts.map(part => <Part key={props.parts.id} name={props.parts.name} exercises={props.parts.exercises}/>)}
    console.log("props: ", props)
    console.log("props.parts: ", props.parts)
    const parties = new Array (props.parts)
    console.log("parties: ",parties)
    console.log("map of names: ", props.parts.map(part => part.name))
    console.log("map of parts: ", props.parts.map(parts => parts))


    return (
        <div>
            <Title title={props.title}/>
            {props.parts.map(parts => <Part key={parts.id} name={parts.name} exercises={parts.exercises}/>)}
            <Total parts={props.parts}/>
        </div>
    )
}

const Total = (props) => {
    const exercises = props.parts.map(part => part.exercises)
    const sum = exercises.reduce((partialSum, a) => partialSum + a, 0);

    return (
        <div>
            <b>
                Total of {sum} exercises
            </b>
        </div>
    )
}

const Course = ({courses}) => {

    return (
        <div>
            <Header/>
            {courses.map(courses =>
                <Content key={courses.id} title={courses.name} parts={courses.parts}/>
            )}

        </div>
    )
}

export default Course