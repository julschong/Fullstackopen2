import React from "react"

const DisplayCountries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length > 1) {
    return (
      <p>
        {countries.map((country) => (
          <>
            {country.name}
            <br></br>
          </>
        ))}
      </p>
    )
  } else if (countries.includes("Loading")) {
    return <p>Loading</p>
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <p>
        <h1>{country.name}</h1>
        <p>
          capital {country.capital}
          <br></br>
          population {country.population}
        </p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="country flag" style={{ width: "200px" }} />
      </p>
    )
  } else {
    return <p>No match</p>
  }
}

export default DisplayCountries
