import axios from 'axios';

// const baseUrl = 'https://phonebook-person-server.herokuapp.com/api/persons';
const baseUrl = 'http://localhost:3001/api/persons';

function fetchPerson() {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data)
}

function onAddPerson(personObject) {
    const request = axios.post(baseUrl, personObject, {
      headers: { 'Content-Type': 'application/json' }
    })
    return request.then((response) => response.data);
}

function onRemovePerson(id) {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
}

function onUpdateNumber(id, formData) {
    const request = axios.put(`${baseUrl}/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' }
    });
    return request.then((response) => response.data);
}

export const person = {
    fetchPerson,
    onAddPerson,
    onRemovePerson,
    onUpdateNumber
}