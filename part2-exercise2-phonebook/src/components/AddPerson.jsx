import React from 'react'

export default function AddPerson({ addPerson, addPersonChange, addNumberChange, newPerson, newNumber }) {
  return (
    <div>
        <form onSubmit={addPerson}>
            Name: <input type="text" name="name" value={newPerson} onChange={addPersonChange} placeholder="Enter your Name..." /><br /><br />
            Number: <input type="text" name="number" value={newNumber} onChange={addNumberChange} placeholder="Enter your Number..." /><br /><br />
            <button type="submit">Add</button>
        </form>
    </div>
  )
}
