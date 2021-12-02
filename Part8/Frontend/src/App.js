
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecomBooks from './components/RecomBooks'
import { ALL_AUTHORS, ALL_BOOKS } from './components/queries'

import { useApolloClient, useQuery } from '@apollo/client'


const App = () => {
  const [user,setUser]=useState(null)
  const [page, setPage] = useState('')
  const [filterBooks ,setFilterBooks ] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()



  const logOut = () => {
    setUser(null)
    setFilterBooks(null)
    localStorage.clear()
    client.resetStore()
}

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }



  return (
    <div>
      
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!user && <button onClick={()=>setPage('login')}>login</button>}
        {user && <button onClick={() => setPage('add')}>add book</button> }
        {user && <button onClick={logOut}>logout</button>}
        {filterBooks && <button onClick={()=>setPage('recommend')}>recommend</button>}

      </div>

      <Authors
        show={page === 'authors'} authors={authors.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={books.data.allBooks}
      />

      <RecomBooks
        show={page === 'recommend'} books={filterBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page ==='login'} setUser={setUser} setPage={setPage} setFilterBooks={setFilterBooks}
      />
    </div>
  )
}

export default App