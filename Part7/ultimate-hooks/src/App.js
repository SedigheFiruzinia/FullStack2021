  
import React, { useState, useEffect } from 'react'
import axios from 'axios'

///////////////////////////////////////////////////////
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const clear = () => {
    setValue('')
}

  return {
    type,
    value,
    onChange,
    clear
  }
}
///////////////////////////////////////////////////
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(()=>{
    getAll(baseUrl)
    .then(response=> {
      console.log('getAll in useEffect')
      setResources(response)
    })
  },[baseUrl])
  
  const getAll = async (url) => {
    const response = await axios.get(url)
    return response.data
  }

  const create = async (resource) => {
    await axios.post(baseUrl, resource)
  }

  const show = async () => {
    const response= await getAll(baseUrl)
    setResources(response)
  }

  const service = {
    create,
    show
  }

  return [
    resources, service
  ]
}
////////////////////////////////////////////////////////////////

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  const threeElements = ({type,value,onChange})=> {
    return {type,value,onChange}
  }



  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')


  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    noteService.show()
    content.clear()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    personService.show()
    name.clear()
    number.clear()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...threeElements(content)} />
        <button>create</button>
      </form>

      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...threeElements(name)} /> <br/>
        number <input {...threeElements(number)} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App