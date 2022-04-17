import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from "./components/Countries";
import Filter from "./components/Filter";

function App() {
  const [countries, setCoutries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  function searchChange(evt) {
    const keyword = evt.target.value;
    setSearchCountry(keyword);
  }

  function fetchCountries() {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
      const countryData = response.data;
      setCoutries(countryData);
    })
    .catch((error) => console.log(error));
  }
  useEffect(() => {fetchCountries()}, []);
  const filteredCountries = countries?.filter((country) => {
    if(searchCountry === '') {
      return null;
    } else {
      const object = country.name.common.toLowerCase();
      return object.includes(searchCountry);
    }
  })
  
  return (
    <div>
      <Countries filteredCountries={filteredCountries} />
      <Filter type="search" placeholder="Search a country" onChange={searchChange} />
    </div>
  );
}

export default App;
