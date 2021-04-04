import React from "react"

const DisplayPersons = ({ persons, filter, onDeleteButtonClicked }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person, i) => (
          <>
            <p key={i} className="personList">
              {person.name} {person.number}{" "}
              <button id={person.id} onClick={onDeleteButtonClicked}>
                delete
            </button>
            </p>
            <br></br>
          </>
        ))}
    </div>
  )
}

export default DisplayPersons
