import React, {useEffect, useState} from 'react';
import Notification from './components/Notification';
import {person} from './service/person';
import AddPerson from './components/AddPerson';
import Home from './components/Home';

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const error = 'ERROR'

  const fetchPersons = () => {
    setLoading(true);
    person.fetchPerson()
    .then((response) => {
      setLoading(false);
      setPersons(response);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }


  const addPerson = (evt) => {
    evt.preventDefault();
    const name = persons?.filter((person) => person?.name === newPerson);

    const currentPersonName = name[0];
    const updateNumber = { ...currentPersonName, number: newNumber };

    if(name?.length !== 0) {
      if(window.confirm('This person has already been added, but you can replace their number')) {
        console.log(name[0])
        person.onUpdateNumber(updateNumber.id, newNumber)
          .then((updatedNumber) => {
            setNewNumber("")
            setNewPerson("")
            setMessage(`${updatedNumber?.name}'s number was updated!`)
            setPersons(persons.map(personInfo => personInfo.id !== currentPersonName ? personInfo : updatedNumber));
          })
          .catch((error) => {
            setMessage('[ERROR] Error changing Number');
            console.log(error?.response?.data?.msg);
          })
      } else {
        return false;
      }
    } else {
      // if(name) {
      //   setTimeout(() => {
      //     setMessage(null);
      //   }, 5000)
      //   setMessage(`${error} ${newPerson} is already added, please choose another name!`)
      //   return false
      // }

      if(newPerson === '') {
        setTimeout(() => {
          setMessage(null);
        }, 5000)
        setMessage(`${error} You need to add a name!`);
        return false;
      }

      const personObject = {
        name: newPerson,
        number: newNumber,
      }

      person.onAddPerson(personObject)
        .then((response) => {
          setPersons([...persons, personObject]);
          setNewPerson('');
          setNewNumber('');
          console.log(response);

          setTimeout(() => {
            setMessage(null);
          }, 5000)
          setMessage(`${response?.name} successfully added to Server!`);
        })
        .catch((error) => {
          console.log(error?.response?.data?.msg);
          setMessage(`ERROR ${error?.response?.data?.msg}`)
        })
    }
  }

  const handleRemovePerson = (id) => {
    if(window.confirm('Are you sure you want to remove this person')) {
    const findPerson = persons.filter(per => per.id === id)
    person.onRemovePerson(id)
    .then((results) => {
      if(results) {
        const deletePerson = persons?.filter((doc) => {
        return doc?.id !== id;
      });
        setPersons(deletePerson);
        setMessage(`data removed`)
        console.log(findPerson[0]?.name)
        console.log(deletePerson)
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      }
    })
    .catch((error) => {
      setMessage(`ERROR ${error?.response?.data?.msg}`)
      console.log(error?.response?.data?.msg);

      if(!findPerson) {
        setMessage(`${findPerson?.name} has already been removed from server.`);
      }
      setTimeout(() => {
        setMessage(null);
      }, 5000)
    });
    } else {
      return false;
    }
  }

  function queryChange(evt) {
    setQuery(evt.target.value.toLowerCase());
  }

  const filteredPersons = persons.filter((person) => {
    if(person === '') {
      return person
    } else {
      const personObject = person.name.toLowerCase()
      return personObject.includes(query)
    }
  })

  function addPersonChange(evt) {
    setNewPerson(evt.target.value);
  } 
  function addNumberChange(evt) {
    setNewNumber(evt.target.value);
  } 

  useEffect(() => { fetchPersons() }, []);
  return (
    <div>
      <AddPerson
        addPerson={addPerson}
        addPersonChange={addPersonChange}
        addNumberChange={addNumberChange}
        newPerson={newPerson}
        newNumber={newNumber}
      /><hr />
        <div>
          <input type="search" value={query} onChange={queryChange} placeholder="Search Filter" /><br /><br />
          {message && <Notification message={message} />}
          {!loading ?
            <div>
              {filteredPersons?.length > 0 ? filteredPersons.map(person => (
                <div>
                  <Home person={person} handleRemovePerson={handleRemovePerson} />
                </div>
              )): <p>No persons found!</p>}
            </div> : <p>Persons Loading...</p>
          }
        </div>
    </div>
  );
}

export default App;
