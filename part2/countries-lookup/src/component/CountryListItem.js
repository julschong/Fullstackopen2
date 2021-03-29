import React, { useState } from "react"
import CountryDetail from "./CountryDetail"

const CountryListItem = ({ country }) => {
  const [show, setShow] = useState(false)

  const onShowButtonClick = () => {
    setShow(!show)
    console.log(
      `${country.name} button status is now ${show ? "hide" : "show"}`
    )
  }

  return (
    <>
      {country.name}
      <button onClick={onShowButtonClick}>{show ? "hide" : "show"}</button>
      <br></br>
      {show ? <CountryDetail country={country} /> : ""}
    </>
  )
}

export default CountryListItem
