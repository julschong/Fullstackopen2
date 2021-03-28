import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const onInputNameChange = (event) => {
    console.log(`Name Change: ${event.target.value}`)
    setNewName(event.target.value)
  }

  const onInputNumberChange = (event) => {
    console.log(`Number Change: ${event.target.value}`)
    setNewNumber(event.target.value)
  }

  const onInputFilterChange = (event) => {
    console.log(`Filter Change: ${event.target.value}`)
    setFilter(event.target.value)
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
      <div>
        filter shown with <input onChange={onInputFilterChange} />
      </div>
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
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person, i) => (
          <p key={i}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  )
}

export default App
