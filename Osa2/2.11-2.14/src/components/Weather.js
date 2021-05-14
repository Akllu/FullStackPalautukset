import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [ weather, setWeather] = useState()

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
            setWeather(response.data)
            console.log(response.data)
        })
      }, [capital])

      if(weather === undefined) {
          return (
              <p> Loading.. </p>
          )
      }
      else {
      return (
        <div>
            <p>
                <b> Weather in {capital} </b>            
            </p>
            <p>
                <b> Temperature: </b> {weather.current.temperature} Celcius   
            </p>
            <p>
                <img src={weather.current.weather_icons} alt='Loading weather..' width='80' height='60' />
            </p>
            <p>
                <b> Wind: </b> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}
            </p>
        </div>
    )}   
}

export default Weather