import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowList from './component/ShowList'
import ShowInfo from './component/ShowInfo'
import Weather from './component/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleSearch = (country) => {
    setNewSearch(country)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const show = () => {
    let s = newSearch.toLowerCase();
    let x = countries.filter(({ name }) => name.toLowerCase().indexOf(s) > -1)

    if (x.length > 10) {
      return (<ul>Too many matches, specify another filter</ul>)
    }
    else {
      if (x.length === 1) {
        const langAry = x[0].languages
        return (
          <>
            <ShowInfo singlecountry={x[0]} />
          </>
        )
      }
      else {
        return (<ShowList list={x} handler={handleSearch} />)
      }
    }
  }

  return (
    <>
      find countries: <input value={newSearch} onChange={(event) => { setNewSearch(event.target.value) }} />
      {show()}
    </>
  )
}

export default App