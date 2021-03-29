import React from "react"
import CountryDetail from "./CountryDetail"
import CountryListItem from "./CountryListItem"

const DisplayCountries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => (
          <CountryListItem key={country.name} country={country} />
        ))}
      </>
    )
  } else if (countries.includes("Loading")) {
    return <p>Loading</p>
  } else if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  } else {
    return <p>No match</p>
  }
}

export default DisplayCountries
