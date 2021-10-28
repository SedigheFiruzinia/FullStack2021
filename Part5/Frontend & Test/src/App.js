/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreatBlogForm from './components/CreatBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage]=useState(null)

  ///////////////////////////////////////////////////
  useEffect(() => {
    console.log('useEffect1')
    blogService.getAll()
      .then( b => setBlogs(b) )
  },[])

  /////////////////////////////////////////////////
  useEffect(() => {
    console.log('useEffect 4')
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  ////////////////////////////////////////////
  const notifyWith = (text, type='success') => {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  ///////////////////////////////////////////////
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
  ///////////////////////////////////////////

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password,blogs)

    try {

      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)

    } catch (exception) {

      notifyWith ('wrong username or password', 'error')
    }
  }

  ///////////////////////////////////////////
  const handleCreate = (blogObject) => {

    blogService.creatBlog(blogObject)
      .then(b => {
        setBlogs(blogs.concat(b))
        notifyWith(`a new blog ${b.title} added`)
      })

  }
  //////////////////////////////////////////
  const logout =() => {
    window.localStorage.clear()
    setUser(null)
  }
  /////////////////////////////////////////////////
  const update =(blog) => {

    const newBlog = {
      title: blog.title,
      auther: blog.auther,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes +1
    }
    blogService.updateLikes(newBlog, blog.id)
      .then(b => setBlogs(
        blogs.map(bg => bg.id===b.id ? { ...bg, likes:bg.likes+1 } : bg)
      )
      )
  }
  ////////////////////////////////////////////////
  const remove = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.auther}`)) {
      blogService.deleteBlog(blog.id)
        .then(
          setBlogs(blogs.filter(b => b.id !== blog.id))
        )
    }

  }
  ////////////////////////////////////////////
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? loginForm() :
        <div>
          <p>{user.name} logged in
            <button onClick={() => logout()}>logout</button></p>

          <Togglable buttonLabel='Create new blog'>
            <h2>Creat New</h2>
            <CreatBlogForm creat={handleCreate}/>
          </Togglable>

          {
            blogs.sort(function(a,b){return b.likes-a.likes}).map (
              a => a.user.username === user.username &&

        <Blog key={a.id} blog={a} update={update} remove={remove}/>

            )}


        </div>
      }

    </div>
  )
}

export default App