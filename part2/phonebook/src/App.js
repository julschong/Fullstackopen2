import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const onInputNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const onSubmitAddPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newNameObj = { name: newName }
    const newPersons = persons.concat(newNameObj)
    setPersons(newPersons)
    setNewName("")
    event.target[0].value = ""
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitAddPerson}>
        <div>
          name: <input onChange={onInputNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>{person.name}</p>
      ))}
    </div>
  )
}

export default App
