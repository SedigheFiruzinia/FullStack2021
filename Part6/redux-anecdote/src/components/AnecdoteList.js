import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/MessageReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filteredAnecs = useSelector(state => {
    if (state.filter !== ''){
      return state.anecdote.filter(an => 
        an.content.toLowerCase().indexOf(state.filter.toLowerCase()) > -1)
    }
    return state.anecdote
  })

  const clickedVote =(anecdote)=>{
    dispatch(changeVote(anecdote))
    dispatch(setMessage(`you voted '${anecdote.content}'`,5))
}

  return (
    <div >
      <h2>Anecdotes</h2>
      {filteredAnecs.sort(function(a,b){return b.votes-a.votes}).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>clickedVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList