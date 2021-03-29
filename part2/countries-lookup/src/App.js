import React, { useState, useEffect } from "react"
import axios from "axios"
import DisplayCountries from "./component/DisplayCountries"

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState(["Loading"])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((result) => {
      const listOfCountries = result.data.filter((el) =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      )
      setCountries(listOfCountries)
      console.log(listOfCountries)
    })
  }, [filter])

  const onInputFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input onChange={onInputFilterChange} />
      <DisplayCountries countries={countries} />
    </div>
  )
}

export default App
