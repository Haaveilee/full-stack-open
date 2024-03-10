import { useState } from 'react'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Title = (props) => {
    return (
        <h1>{props.text}</h1>
    )
}

const Displayer = (props) => {
    return (
        <p>{props.text}</p>
    )
}

const Votes = (props) => {
    if (props.value == 1) {
        return (
            <p>This anecdote has {props.value} vote</p>
        )
    } else {
        return (
            <p>This anecdote has {props.value} votes</p>
        )
    }
}

const MostVoted = (props) => {

    const indexOfMax = props.points.indexOf(Math.max(...props.points))
    const votesOfMax = props.points[indexOfMax]

    return (
        <div>
            <Displayer text={props.anecdotes[indexOfMax]}/>
            <Votes value={votesOfMax}/>
        </div>
    )
}
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    const defaultPoints = new Array(8).fill(0)

    const [selected, setSelected] = useState(getRandomInt(8))
    const [points] = useState(defaultPoints)

    return (
        <div>
            <Title text={"Anecdote of the day"}/>
            <Displayer text={anecdotes[selected]}/>
            <Votes value={points[selected]} />
            <button onClick={() => points[selected]=points[selected]+1}>Vote</button>
            <button onClick={() => setSelected(getRandomInt(8))}>Next Anecdote</button>
            <Title text={"Anecdote with most votes:"}/>
            <MostVoted points={points} anecdotes={anecdotes}/>
        </div>

    )
}

export default App