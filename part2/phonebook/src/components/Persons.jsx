import React from 'react';
import contactsService from "../services/Contacts";

const Contact = (props) => {

    const deletionHandler = (event) => {
        event.preventDefault()
        if (window.confirm(`Do you want to delete ${props.name}?`))
        {
            contactsService
                .erase(props.id)
                .then(console.log("deleted"))
            props.onDelete(props.id)
        }
    }

    return (
        <div>
            <p>
                {props.name} {props.number} <button type="submit" onClick={deletionHandler}>
                delete
            </button>
            </p>
        </div>
    )
}

const Persons = ({ persons, setPersons }) => {
    const onDelete = (id) => {
        setPersons(persons.filter(person => person.id !== id));
    };

    return (
        <div>
            {persons.map((person) => (
                <Contact key={person.name} name={person.name} number={person.number} id={person.id} onDelete={onDelete}/>
            ))}
        </div>
    );
};

export default Persons;