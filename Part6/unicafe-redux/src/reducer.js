const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':{
      const newunicafe = {...state , good: state.good+1}
      return newunicafe
    }
    case 'OK':{
      const newunicafe = {...state , ok: state.ok+1}
      return newunicafe
    }
    case 'BAD':{
      const newunicafe = {...state , bad: state.bad+1}
      return newunicafe
    }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer