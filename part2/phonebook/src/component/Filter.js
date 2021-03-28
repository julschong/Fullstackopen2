import React from "react"

const Filter = ({ onInputFilterChange }) => {
  return (
    <div>
      filter shown with <input onChange={onInputFilterChange} />
    </div>
  )
}

export default Filter
