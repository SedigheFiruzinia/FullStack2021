import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import BlogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers ({
  Notification: notificationReducer,
  Blogs: BlogReducer,
  User:userReducer,
  Users:usersReducer
})

const composeEnhancer = composeWithDevTools({ trace:true })

const store=createStore(reducer , composeEnhancer(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)