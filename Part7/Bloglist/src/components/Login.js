import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import loginService from '../services/loginService'
import blogService from '../services/blogsService'
import { userLoggedin } from '../reducers/userReducer'
import { loginFailed } from '../reducers/notificationReducer'
import { Form,Button } from 'react-bootstrap'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const loginForm = () => (
    <div>
      <Form onSubmit={handleLogin}>

        <Form.Group>
          <Form.Label>Usename:</Form.Label>
          <Form.Control
            type="text"
            id='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            id='password'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='primary' id='login-button' type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )

  ///////////////////////////////////////////

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(userLoggedin(user))
      //setUser(user)

    } catch (exception) {
      dispatch(loginFailed())
    }
  }
  return (
    <div>
      {loginForm()}
    </div>
  )

}

export default Login