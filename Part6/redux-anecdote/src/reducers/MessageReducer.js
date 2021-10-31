
const initialState = 'Initial Message is Here!'
let timeOut = null

export const setMessage = ( m , showTime ) => {
  return async dispatch => {
    await dispatch({
      type: 'message',
      text: m
    })
    
    timeOut = setTimeout(() => {
      dispatch({type: 'removeMessage'})
    }, showTime*1000)


  }
}


const MessageReducer =(state = initialState , action)=>{
switch (action.type){
  case 'message':
    clearTimeout(timeOut)
    return action.text
  case 'removeMessage':
    return ''
  default:
    return state
}
  
}

export default MessageReducer