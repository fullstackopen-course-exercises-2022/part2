import React from 'react';
import Weather from "./Weather";

const Countries = (props) => {
    const { filteredCountries } = props;

    if(filteredCountries.length === 1) {
        return (
            <div>
                {filteredCountries?.map(country => (
                    <div>
                        <h1>{country?.name?.common}</h1>
                        <p>{country?.languages[0]}</p>
                        <img src={country?.flags?.svg} alt="" width="300" height="200" />
                        <p>Country's Capitals: {country?.capital[0]}</p>
                        <p>{country?.languages[0]}</p>
                        <Weather country={country} />
                    </div>
                ))}
            </div>
        )
    }

    if(filteredCountries.length <= 10) {
        return (
            <div>
                {filteredCountries?.map(country => (
                    <div>
                       <p>{country?.name?.common}</p> <button>Show</button>
                    </div>
                ))}
            </div>
        );
    } else {
        return <p>Too many matches, specify another filter</p>
    }
}

export default Countries;