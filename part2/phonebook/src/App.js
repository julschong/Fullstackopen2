import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "123456789" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const onInputNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const onInputNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const onSubmitAddPerson = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }
    if (
      persons.some(
        (person) => person.name === newName && person.number === newNumber
      )
    ) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPersons = persons.concat(newPerson)
    setPersons(newPersons)
    setNewName("")
    setNewNumber("")
    event.target[0].value = ""
    event.target[1].value = ""
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitAddPerson}>
        <div>
          name: <input onChange={onInputNameChange} />
        </div>
        <div>
          number: <input onChange={onInputNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App
