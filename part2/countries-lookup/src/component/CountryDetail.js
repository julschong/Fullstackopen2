import React, { useState, useEffect } from "react"
import axios from "axios"
import WeatherDisplay from "./WeatherDisplay"

const CountryDetail = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const weatherAPIURL = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
  const [weatherData, setWeatherDate] = useState({})

  useEffect(() => {
    axios
      .get(weatherAPIURL)
      .then((result) => {
        setWeatherDate(result.data)
        console.log(result.data)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  return (
    <>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}
        <br></br>
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={country.name + language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" style={{ width: "200px" }} />
      <h2>Weather in {country.capital}</h2>
      <WeatherDisplay weatherData={weatherData} />
    </>
  )
}

export default CountryDetail
