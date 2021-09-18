import React, { useState } from 'react'
import Show from './components/Show'


const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }]) 
  const [ newPerson, setNewPerson ] = useState('')

  const addNew = (event) => {
    event.preventDefault()
    const personObj=[{name: newPerson}]
    const found=persons.find(({name}) => name === newPerson)
    if (typeof found !== "undefined"){
      window.alert(`${newPerson} is already added to phonebook`)
    }
    else{setPersons(persons.concat(personObj))
      setNewPerson('')}
    
    
  }
  const personExists = () => {
    
  }

  const handlePersonChange = (event) =>{
    setNewPerson(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>
          name: <input value={newPerson} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <Show p={p} />)}
      </ul>
    </div>
  )
}

export default App