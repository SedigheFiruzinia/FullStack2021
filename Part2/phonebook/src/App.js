import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import noteServise from './services/notes'


const App = () => {
  const [persons, setPersons] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect')
    noteServise
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const searchHandler = (event) => {
    setSearchName(event.target.value)
}

  
  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input value={searchName} onChange={searchHandler} />
      </div>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Person search={searchName} person={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App