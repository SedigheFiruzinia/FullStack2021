import React from 'react'
import Weather from './Weather'

const ShowInfo = ({ singlecountry }) => {


    const langAry = singlecountry.languages
    const langname = langAry.map(c => <li key={c.name}>{c.name}</li>)

        return (

            <div>
                <h1 > {singlecountry.name} </h1>
                <div>capital {singlecountry.capital}</div>
                <div>population {singlecountry.population}</div>
                <h1>languages</h1>
                {langname}
                <h1>Weather in {singlecountry.capital}</h1>
                <Weather singlecountry={singlecountry}/>
            </div>

        )

}

//<img src={singlecountry.flag} alt={' '} width={'200'} />
//<h1>weather in {singlecountry.capital}</h1>
//<h2>temperature: {weather.current.temperature}</h2>
//<img src={weather.current.weather_icons[0]} alt={' '} width={'100'} />
//<h2>wind: {weather.current.wind_speed} mph direction</h2>
export default ShowInfo