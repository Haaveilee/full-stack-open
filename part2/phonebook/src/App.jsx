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
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filtered, setFiltered] = useState('')

    const contactsToShow = filtered
        ? persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))
        : persons;

    const newNameHandler = (event) => {
        event.preventDefault()
        setNewName(event.target.value)
        console.log('new name clicked: ', event.target.value)
    }

    const newPhoneHandler = (event) => {
        event.preventDefault()
        setNewPhone(event.target.value)
        console.log('new phone clicked: ', event.target.value)
    }

    const filteredHandler = (event) => {
        event.preventDefault()
        setFiltered(event.target.value)
        console.log('filter clicked: ', event.target.value)
    }

    const addContact = (event) => {
        const contact = {
            name: newName,
            number: newPhone
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
            Filter shown with <input
                value={filtered}
                onChange={filteredHandler}/>
            <h2>Add new...</h2>
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
            {contactsToShow.map(persons =>
                <Contact key={persons.name} name={persons.name} number={persons.number}/>
            )}
        </div>
    )
}

export default App