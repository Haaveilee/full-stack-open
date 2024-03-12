import { useState } from 'react'

const Name = (props) => {
    return (
        <div>
            <p>
                {props.name}
            </p>
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const newNameHandler = (event) => {
        event.preventDefault()
        setNewName(event.target.value)
        console.log('button clicked', event.target.value)
    }

    const addName = (event) => {
        const person = {
            name: newName,
        }
        event.preventDefault()
        setPersons(persons.concat(person))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input
                        value={newName}
                        onChange={newNameHandler}/>
                </div>
                <div>
                    <button type="submit" onClick={addName}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            debug: {newName}
            {persons.map(persons =>
                <Name key={persons.name} name={persons.name}/>
            )}
        </div>
    )
}

export default App