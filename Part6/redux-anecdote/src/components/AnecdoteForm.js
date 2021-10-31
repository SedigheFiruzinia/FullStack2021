
import React from 'react'
//import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import {setMessage} from '../reducers/MessageReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addAnecdotes= (event)=>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    //dispatch(newAnecdote(content))
    props.newAnecdote(content)
    //dispatch(setMessage( `you created '${content}'` , 5 ))
    props.setMessage(`you created '${content}'` , 5)
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdotes}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
    </div>
  )
}

/*
const mapDispatchToProps = dispatch => {
  return {
    newAnecdote: value => {
      dispatch(newAnecdote(value))
    },
    setMessage: value => {
      dispatch(setMessage(value))
    },
  }
}*/

const ConnectedForm = connect(null,{newAnecdote:newAnecdote, setMessage:setMessage})(AnecdoteForm)
export default ConnectedForm