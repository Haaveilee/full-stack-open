import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactsService from "./services/Contacts";

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filtered, setFiltered] = useState('')

    useEffect(() => {
        contactsService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, [])
    console.log('render', persons.length, 'persons')

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
        event.preventDefault()
        if (newName !== persons[persons.length - 1].name) {
            contactsService
                .create(contact)
                .then(contact => {
                    setPersons(persons.concat(contact))
                })
            setNewName('')
            setNewPhone('')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filtered} onChange={filteredHandler} />
            <h3>Add a new</h3>
            <PersonForm
                newName={newName}
                newPhone={newPhone}
                newNameHandler={newNameHandler}
                newPhoneHandler={newPhoneHandler}
                addContact={addContact}
            />
            <h3>Numbers</h3>
            <Persons persons={contactsToShow} />
        </div>
    )
}

export default App