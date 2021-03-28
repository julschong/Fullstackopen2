import React, { useState, useEffect } from "react"
import AddPersonForm from "./component/AddPersonForm"
import DisplayPersons from "./component/DisplayPersons"
import Filter from "./component/Filter"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

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
    } else if (newName === "" || newNumber === "") {
      alert(`Name and Number cannot be empty`)
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
      <Filter onInputFilterChange={onInputFilterChange} />
      <AddPersonForm
        onSubmitAddPerson={onSubmitAddPerson}
        onInputNameChange={onInputNameChange}
        onInputNumberChange={onInputNumberChange}
      />
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} filter={filter} />
    </div>
  )
}

export default App
