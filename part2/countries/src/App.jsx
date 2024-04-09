import axios from "axios";
import { useState, useEffect } from 'react';

const Countries = ({countries}) => {
    if (countries.length >= 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length > 1) {
        return (
            <>
                {countries.map(country => {
                    return (
                        <p key={country.ccn3}>{country.name.common}</p>
                    )
                })}
            </>
        )
    } else if (countries.length === 1) {
        const selectedCountry = countries[0];
        return (
            <>
                <h2>{selectedCountry.name.common}</h2>
                <p>Capital: {selectedCountry.capital[0]}</p>
                <p>Area: {selectedCountry.area}</p>
                <ul>
                    {Object.keys(selectedCountry.languages).map(key =>
                        <li key={selectedCountry.languages[key]}>{selectedCountry.languages[key]}</li>
                    )}
                </ul>
                <img src={selectedCountry.flags.png} width='10%' />
            </>
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
            <Countries countries={filteredCountries} />
        </div>
    )
}

export default App