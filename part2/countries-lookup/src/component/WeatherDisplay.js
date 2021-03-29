import React from "react"

const WeatherDisplay = ({ weatherData }) => {
  if (isEmpty(weatherData)) {
    return <p></p>
  } else {
    return (
      <p>
        <b>temperature: </b> {isEmpty(weatherData) ? "" : weatherData.main.temp}{" "}
        Celcius
        <br></br>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="weather_icon"
          style={{ width: "100px" }}
        />
        <br></br>
        <b>wind: </b> {weatherData.wind.speed} kph direction{" "}
        {weatherData.wind.deg} degree
      </p>
    )
  }
}
const isEmpty = (obj) => {
  return JSON.stringify(obj) === "{}"
}

export default WeatherDisplay
