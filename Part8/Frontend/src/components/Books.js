
import React, { useState } from 'react'

const Books = (props) => {

const [bookFilter,setBookFilter] = useState(props.books)
const [genre,setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  const handleGenreClicked =(genre)=>{
    setBookFilter(props.books.filter(b=>b.genres.includes(genre)))
    setGenre(genre)
  }

  const allGenres=()=>{
    setBookFilter(props.books) 
    setGenre(null)
  }

  const Genres = () => {
    let allG = props.books.map(b=>b.genres)
    allG = Array.prototype.concat.apply([],allG)
    const uniqueGenres= allG.filter((v,i,a)=>a.indexOf(v)===i)
    return(
      <div>
      {uniqueGenres.map(g=><button key={g} onClick={()=>handleGenreClicked(g)}>{g}</button>)}
      <button onClick={allGenres}>all Genres</button>
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
          {bookFilter.map(a =>
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