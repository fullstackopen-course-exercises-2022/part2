import React, { useState } from 'react';

import AddPerson from './AddPerson';
import SearchBar from './SearchBar';


function Exercise2() {
  const [person, setPerson] = useState([
    { name: "Emmanuel", number: "+44 7415 639792", id: 1 }, 
    { name: "Sarah", number: "+44 7468 928234", id: 2 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const handleChangeName = (evt) => {
    console.log(evt.target.value);
    setNewName(evt.target.value);
  }

  const handleChangeNumber = (evt) => {
    console.log(evt.target.value);
    setNewNumber(evt.target.value);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const findPerson = person.find(per => per.name === newName);
    if(findPerson) {
      setMessage(`${newName} already exists`);
      return false;
    }

    const addNewPerson = {
      name: newName,
      number: newNumber,
      id: person.length + 1
    }
    // Another way to push the new person to the person array.
    // setPerson(person.concat(addNewPerson));
    setPerson([ ...person, addNewPerson ]);
    setNewName('')
    setNewNumber('')
    if (newName === "") {
      setMessage("Add a contact's name!")
      return false;
    }
  }

  function handleSearchChange(evt) {
    const keyword = evt.target.value.toLowerCase();
    setSearch(keyword);
  }

  const filteredPerson = person?.filter((per) => {
    if(per === '') {
      return per;
    } else {
      const personName = per?.name.toLowerCase();
      return personName?.includes(search);
    }
  })

  console.log(filteredPerson);
  return (
    <div>
      <h1>Hello Persons</h1>
      <hr />
      {message && <p>{message}</p>}
      <AddPerson 
        handleSubmit={handleSubmit} 
        handleChangeName={handleChangeName} 
        handleChangeNumber={handleChangeNumber} 
        newName={newName}
        newNumber={newNumber}
      />
      <SearchBar handleSearchChange={handleSearchChange} />
      <br />
      <div>
        {filteredPerson?.length > 0 ? filteredPerson?.map(person => (
          <>
            <p>Name: {person?.name}{', '}Phone No: {person?.number}</p>
          </>
        )): <p>No user Found!</p>}
      </div>
    </div>
  );
}

export default Exercise2;
