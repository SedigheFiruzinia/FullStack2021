import React, { useState } from 'react'
import noteServise from '../services/notes'
import Notification from './Notification'

const PersonForm = ({ persons, setPersons }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [notification, setNotification] = useState(null)
    const [type, setType]=useState(0)

    const newNameHandler = (event) => {
        setNewName(event.target.value)
    }

    const newNumberHandler = (event) => {
        setNewNumber(event.target.value)
    }

    const addNew = (event) => {
        event.preventDefault()
        const personObj = { name: newName, number: newNumber }
        const found = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())

        if (typeof found[0] === "undefined") {
            noteServise
                .create(personObj)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setType(0)
                    setNotification(`Added ${personObj.name}`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)

                })
        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
                personObj.id = found[0].id
                noteServise
                    .update(personObj, found[0].id)
                    .then(response => {
                        
                        setPersons(persons.map(p => p.id !== found[0].id ? p : personObj))
                        setNewName('')
                        setNewNumber('')
                        setType(0)
                        setNotification(`Updated phone number for ${newName} `)
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setPersons(persons.filter(p => p.id !== personObj.id))
                        setType(1)
                        setNotification(`Information of ${personObj.name} has already been removed from server`)
                        setNewName('')
                        setNewNumber('')
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
            }
        }
    }

    return (
        <form onSubmit={addNew}>

            <Notification message={notification} type={type}/>

            <div>
                name: <input value={newName} onChange={newNameHandler} />
            </div>
            <div>
                number: <input value={newNumber} onChange={newNumberHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}
export default PersonForm