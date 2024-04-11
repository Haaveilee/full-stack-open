import { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import contactsService from "./services/Contacts";

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filtered, setFiltered] = useState('')
    const [message, setMessage] = useState('')
    const [messageClass, setMessageClass] = useState('')

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
        const existingName = persons.some(person => person.name === newName)
        if (!existingName) {
            contactsService
                .create(contact)
                .then(contact => {
                    setPersons(persons.concat(contact)
                    );
                    setMessageClass('eventMessage')
                    setMessage(
                        `${contact.name} was successfully created`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                }).catch(error => {
                setMessage(
                    `${error.response.data.error}`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000);
                setMessageClass('error')
                setPersons(persons.filter(person => person.id !== existingContact.id))
            })
            setNewName('')
            setNewPhone('')
        } else {
            if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`))
            {
                const existingContact = persons.find(person => person.name === newName);
                contactsService
                    .replace(existingContact.id, contact)
                    .then(updatedContact => {
                        const updatedPersons = persons.map(person =>
                            person.id === updatedContact.id ? updatedContact : person
                        );
                        setMessageClass('eventMessage')
                        setMessage(
                            `The number of ${existingContact.name} has been replaced`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                        setPersons(updatedPersons)
                        setNewName('')
                        setNewPhone('')
                    })
                    .catch(error => {
                        setMessage(
                            `The information of ${existingContact.name} were already deleted from the server`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000);
                        setMessageClass('error')
                        setPersons(persons.filter(person => person.id !== existingContact.id))
                    })
            }
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} messageClass={messageClass} />
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
            <Persons
                persons={contactsToShow}
                setPersons={setPersons}
                />
        </div>
    )
}

export default App