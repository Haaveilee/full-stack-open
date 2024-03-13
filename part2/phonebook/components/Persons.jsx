import React from 'react';


const Contact = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.number}
            </p>
        </div>
    )
}

const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map((person) => (
                <Contact key={person.name} name={person.name} number={person.number} />
            ))}
        </div>
    );
};

export default Persons;