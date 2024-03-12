import { useState } from 'react'

const Contact = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.number}
            </p>
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas',
          phone: '040-123456'}
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const newNameHandler = (event) => {
        event.preventDefault()
        setNewName(event.target.value)
        console.log('button clicked', event.target.value)
    }

    const newPhoneHandler = (event) => {
        event.preventDefault()
        setNewPhone(event.target.value)
        console.log('button clicked', event.target.value)
    }

    const addContact = (event) => {
        const contact = {
            name: newName,
            phone: newPhone
        }
        console.log(newName, newPhone)
        console.log(contact)
        event.preventDefault()
        if (newName !== persons[persons.length - 1].name) {
            setPersons(persons.concat(contact))
        } else {
            alert(`${newName} is already added to phonebook`)
        }
        setNewName('')
        setNewPhone('')
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
                    phone: <input
                    value={newPhone}
                    onChange={newPhoneHandler}/>
                </div>
                <div>
                    <button type="submit" onClick={addContact}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            debug: {newName}
            debug: {newPhone}
            {persons.map(persons =>
                <Contact key={persons.name} name={persons.name} number={persons.phone}/>
            )}
        </div>
    )
}

export default App