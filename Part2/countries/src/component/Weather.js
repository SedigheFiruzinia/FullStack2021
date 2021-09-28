import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShowInfo from './ShowInfo'

const Weather = ({ singlecountry }) => {

    const [weather, setWeather] = useState()

    useEffect(() => {
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: singlecountry.capital
        }
        console.log('EFFECT')
        axios
            .get('http://api.weatherstack.com/current', { params })
            .then(response => {
                console.log('PROMISE FULFILLED')
                setWeather(response.data)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    //console.log( 'RENDER',weather, 'weather')
    console.log(weather)
   if (weather){
    return(  
        <div>  
        <div>temprature: {weather && weather.current.temperature}</div>
        <img src={weather.current.weather_icons[0]} alt={' '} width={'100'} />
        <div>wind: {weather.current.wind_speed} mph direction</div>
        </div>
        
        )
   }
     else {
         return null
     }  

}

export default Weather