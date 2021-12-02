  
import React, {useState} from 'react'
import { SET_BORN, ALL_AUTHORS } from './queries'
import { useMutation } from '@apollo/client'

// const Update = () => {
//   const [update] = useMutation(SET_BORN,{
//     refetchQueries: [{query:ALL_AUTHORS}],
//     onError: (error) => {
//       console.log({error})
//     }
//   })

// const [name,setName]=useState('')
// const [setBornTo,setBorn]=useState('')

// const submit=(event)=>{
//     event.preventDefault()
//     update({
//       variables:{name,setBornTo}
//     })
//     setBorn('')
//     setName('')
// }

// return (
//     <div>
//     <h2>Set Birthyear</h2>
//     <form onSubmit={submit}>
//       <div>
//         name
//         <input value={name} onChange={({ target }) => setName(target.value)}/>
//       </div>
//       <div>
//         born
//       <input value={setBornTo} type='number' onChange={({target}) => setBorn(Number(target.value))}/>
//       </div>
//       <button type='submit'>update author</button>
//     </form>
//     </div>
//   )
// }
const Update = (props) => {

  const [update] = useMutation(SET_BORN,{
    refetchQueries: [{query:ALL_AUTHORS}],
    onError: (error) => {
      console.log({error})
    }
  })

const [name,setName]=useState('')
const [born,setBorn]=useState('')

const submit= (event)=>{
  console.log(name)
    event.preventDefault()
    update({
      variables:{name,born}
    })
    setBorn('')
    setName('')
}

return (
    <div>
    <h2>Set Birthyear</h2>
    <select value={name} onChange={({ target }) => setName(target.value)}>
      {props.authors.map(a => <option key={a.name} value={a.name} >{a.name}</option> )}
    </select>
    <form onSubmit={submit}>
      <div>
        born
      <input value={born} type='number' onChange={({target}) => setBorn(Number(target.value))}/>
      </div>
      <button type='submit'>update author</button>
    </form>
    </div>
  )
}








const Authors = (props) => {

  if (!props.show) {
    return null
  }

  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Update authors={authors}/>
    </div>
  )
}

export default Authors
