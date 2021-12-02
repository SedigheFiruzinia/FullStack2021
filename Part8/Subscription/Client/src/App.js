
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecomBooks from './components/RecomBooks'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './components/queries'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'




const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


const App = () => {
  const [user,setUser]=useState(null)
  const [page, setPage] = useState('')
  const [filterBooks ,setFilterBooks ] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()




  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }



  const updateCacheWith = (addedBook) => {

    const includedIn = (set, object) => {
      set.map(book => book.id).includes(object.id)  
    }
    
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log('in updateCatchWith',addedBook)
      console.log('in updateCatchWith',dataInStore.allBooks)
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }

  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const logOut = () => {
    setUser(null)
    setFilterBooks(null)
    setPage('')
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
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'} authors={authors.data.allAuthors}
      />


      {page==='books' &&
        <Books
        show={page === 'books'} books={books.data.allBooks}
        />
      }
      
      <RecomBooks
        show={page === 'recommend'} books={filterBooks}
      />

      <NewBook
        show={page === 'add'} updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page ==='login'} setUser={setUser} setPage={setPage} setFilterBooks={setFilterBooks}
      />
    </div>
  )
}

export default App