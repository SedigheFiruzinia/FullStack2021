
import anecdoteService from '../services/anecdotes'

export const changeVote=(anecdote)=>{
  return async dispatch => {
    const changedAneced = await anecdoteService.changeVote(anecdote)
    dispatch({
      type: 'vote',
      data: changedAneced
    })
    
  }
}

export const newAnecdote=(data)=>{
return async dispatch =>{
  const newAnec = await anecdoteService.creatNew(data)
  dispatch({
    type: 'addNew',
    data: newAnec,
  })
}
}

export const initialize=()=>{
  return async dispatch => {
    const allAnecs = await anecdoteService.getAll()
    dispatch({    
      type: 'init',
      data: allAnecs
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type){
    case 'vote':
      const id= action.data.id
      const anecdoteToChange = state.find( n => n.id === id)
      const changed = {
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes+1
      }
      return state.map(n => n.id!==id ? n : changed)
    case 'addNew':
      return [...state, action.data]
    case 'init':
      return action.data
    default:
        return state
    }


}

export default reducer