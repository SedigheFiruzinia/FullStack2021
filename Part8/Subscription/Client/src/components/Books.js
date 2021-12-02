
import { useLazyQuery ,useQuery} from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, FIND_BOOKS } from './queries'

const Books = (props) => {

const [books,setBooks] = useState(props.books)
const [getBooks, result]=useLazyQuery(FIND_BOOKS)
const [genre,setGenre] = useState(null)

const b = useQuery(ALL_BOOKS)

useEffect (()=>{
  console.log('useEffectBookbooks')
  if (result.data){
    console.log('if')
    setBooks(result.data.allBooks)
  }
  else setBooks(b.data.allBooks)
//eslint-disable-next-line
}, [result.data])


if(books.loading){
  return <div>{'loading...'}</div>
}



  if (!props.show) {
    return null
  }



  const allGenres=(genre)=>{
    genre===''? setGenre(null):setGenre(genre)
    getBooks({variables:{genre:genre}})
  
  }

  const Genres = () => {
    let allG = books.map(b=>b.genres)
    allG = Array.prototype.concat.apply([],allG)
    const uniqueGenres= allG.filter((v,i,a)=>a.indexOf(v)===i)
    return(
      <div>
      {uniqueGenres.map(g=><button key={g} onClick={()=>allGenres(g)}>{g}</button>)}
      
      <button onClick={()=>allGenres('')}>all Genres</button>
      </div>
    )
  }


  return (
    <div>
      <h2>books
      {genre && <span> in {genre} </span>}
      </h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {Genres()}
    </div>
  )
}

export default Books