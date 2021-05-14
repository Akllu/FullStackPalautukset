import React from 'react'
import Weather from './Weather'

const Countries = (props) => {
    let countries = props.countries

    if(props.newFilter === "") {
        return (
            <div> Type to start the search! </div>
        )
    }
    else {
        countries = countries.filter(country => country.name.toLowerCase().includes(props.newFilter.toLowerCase()))
        if(countries.length > 10) {
            return (
                <div> Too many matches, specify another filter! </div>
            )
        }
        else if(countries.length <= 10 && countries.length > 1) {
            const showCountries = () => countries.map(country => 
                <li key={country.name}> {country.name} <button value={country.name} onClick={props.showClicked} > Show </button> </li> )
            return (
                <ul> {showCountries()} </ul>
            )
        }
        else {
            const showCountry = () => countries.map(country =>
                <div key={country.name}>
                    <h1> {country.name} </h1>
                    <b> Capital: </b> {country.capital}                    
                    <p>
                        <b> Population: </b> {country.population}                               
                    </p>
                    <h3> Languages </h3>
                    <ul>
                        {
                            country.languages.map(language => (
                            <li key={language.name}> {language.name} </li> ))
                        }
                    </ul>
                    <img src={country.flag} alt='Loading country flag..' width='225' height='150' />
                    <Weather capital={country.capital} />
                </div> )
            return (
                <div>
                    {showCountry()}  
                </div>
            )
        }
    }
}

export default Countries