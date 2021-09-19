import React, { useState } from 'react'
import Person from './components/Person'

const PersonForm = ({ addNew, newName, newNumber, setNewName, setNewNumber }) => {
  return (
    <form onSubmit={addNew}>
      <div>
        name: <input value={newName} onChange={(event) => { setNewName(event.target.value) }} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => { setNewNumber(event.target.value) }} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addNew = (event) => {
    event.preventDefault()
    const personObj = [{ name: newName, number: newNumber, id: persons.length + 1 }]
    const found = persons.find(({ name }) => name === newName)
    if (typeof found !== "undefined") {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchName} onChange={(event) => { setSearchName(event.target.value) }} />
      </div>
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addNew={addNew} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Person search={searchName} person={persons} />
    </div>
  )
}

export default App