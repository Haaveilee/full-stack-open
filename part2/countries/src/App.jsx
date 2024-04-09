import axios from "axios";
import { useState, useEffect } from 'react';

const Country = (props) => {
    const showHandler = (event) => {
        event.preventDefault()
        console.log("clicked", props.id, props.name)
        props.toShow(props.id)
    }

    return (
       <div>
           <p>{props.name} <button type="submit" onClick={showHandler}>show</button></p>
       </div>
    )
}

const CountryToShow = (props) => {
    console.log(props)

    return (
        <div>
            <h2>{props.countryToShow.name.common}</h2>
            <p>Capital: {props.countryToShow.capital[0]}</p>
            <p>Area: {props.countryToShow.area}</p>
            <ul>
                {Object.keys(props.countryToShow.languages).map(key =>
                    <li key={props.countryToShow.languages[key]}>{props.countryToShow.languages[key]}</li>
                )}
            </ul>
            <img src={props.countryToShow.flags.png} width='10%' />
        </div>
    )
}

const Countries = ({filteredCountries, setFilteredCountries}) => {

    const toShow = (id) => {
        console.log(filteredCountries)
        setFilteredCountries(filteredCountries.filter(country => country.ccn3 === id))
        console.log(filteredCountries)
    }

    if (filteredCountries.length >= 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (filteredCountries.length > 1) {

        return (
            <div>
                {filteredCountries.map((country) => (
                    <Country key={country.ccn3} name={country.name.common} id={country.ccn3} toShow={toShow}/>
                ))}
            </div>
        )
    } else if (filteredCountries.length === 1) {

        return (
            <div>
                <CountryToShow countryToShow={filteredCountries[0]}/>
            </div>
        )
    }
}

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const hook = () => {
        console.log('hooked')
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
                console.log('countries are: ', countries.length)
            })
    }
    useEffect(hook, []);

    const filterCountries = (event) => {
        const textInput = event.target.value;
        const matchingCountries = [];
        countries.forEach(country => {
            if (country.name.common.toLowerCase().includes(textInput.toLowerCase())) {
                matchingCountries.push(country);
            }
        })
        setFilteredCountries(matchingCountries);
    }
    return (
        <div>
            Find a country: <input onChange={filterCountries} />
            <Countries filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
        </div>
    )
}

export default App