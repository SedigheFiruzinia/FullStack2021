import { createStore , combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecReducer from './reducers/anecdoteReducer'
import MesReducer from './reducers/MessageReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdote: anecReducer,
    message: MesReducer,
    filter: filterReducer,
  })


export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))