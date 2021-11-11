
import React, { useEffect } from 'react'
import blogService from './services/blogsService'
import { useDispatch , useSelector } from 'react-redux'
import { blogInitialized } from './reducers/blogReducer'
import { userLoggedin, userLoggedOut } from './reducers/userReducer'
import{
  BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import UserInfo from './components/UserInfo'
import Users from './components/Users'
import { usersInitialized } from './reducers/usersReducer'
import Blogs from './components/Blogs'
import BlogInfo from './components/BlogInfo'
import { Navbar,Nav,Button } from 'react-bootstrap'
import Login from './components/Login'



const App = () => {
  const userInStore = useSelector(element => element.User)
  const dispatch = useDispatch()
  ////////////////////////////////////////////
  useEffect( () => {
    console.log('useEffect Users Rendering')
    dispatch(usersInitialized())
  },[])
  /////////////////////////////////////////////
  useEffect(() => {
    console.log('useEffect1')
    dispatch(blogInitialized())
  },[])
  /////////////////////////////////////////////////
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('useEffect2')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userLoggedin(user))
      blogService.setToken(user.token)
    }
  }, [])
  ///////////////////////////////////////////////
  const logout =() => {
    window.localStorage.clear()
    dispatch(userLoggedOut())
  }
  ///////////////////////////////////////////////
  return (
    <div className="container">
      {userInStore === null
        ? <Login />
        :
        <Router>
          <Navbar className="fixed-top collapseOnSelect nav-bar" expand="lg" bg="secondary" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">

                <Nav.Link href="#" as="span">
                  <Link to='/' style={{ color:'white' , fontWeight:'bold' }}>blogs</Link>
                </Nav.Link>

                <Nav.Link href="#" as="span">
                  <Link to='/users' style={{ color:'white' , fontWeight:'bold' }}>users</Link>
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>
            <Navbar.Brand href="#" as="span">
              <em style={{ fontSize:15 }}>{userInStore.user.name} logged in {'  '} </em>
              <Button variant="info" size="sm" onClick={() => logout()}>logout</Button>{' '}
            </Navbar.Brand>
          </Navbar>

          <Switch>
            <Route path='/users/:id'>
              <UserInfo/>
            </Route>
            <Route path='/users'>
              <Users/>
            </Route>
            <Route path='/blogs/:id'>
              <BlogInfo/>
            </Route>
            <Route path='/'>
              <Blogs/>
            </Route>
          </Switch>
        </Router>

      }
    </div>

  )
}

export default App