


export const setFilter = (m) => {
  return {
    type: 'FILTER',
    text: m
  }
}

const MessageReducer =(state = '' , action)=>{
switch (action.type){
  case 'FILTER':
    return action.text
  default:
    return state
}
  
}

export default MessageReducer