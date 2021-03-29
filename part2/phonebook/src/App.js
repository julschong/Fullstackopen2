import React, { useState, useEffect } from "react"
import AddPersonForm from "./component/AddPersonForm"
import DisplayPersons from "./component/DisplayPersons"
import Filter from "./component/Filter"
import noteServices from "./services/NoteServices"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  //useEffect to call network request to retrieve Persons.
  useEffect(() => {
    noteServices.getAll().then((response) => {
      setPersons(response)
    })
  }, [])

  const onInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onInputFilterChange = (event) => {
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

    noteServices.create(newPerson).then((newAddedPerson) => {
      const newPersons = persons.concat(newAddedPerson)
      setPersons(newPersons)
      setNewName("")
      setNewNumber("")
      event.target[0].value = ""
      event.target[1].value = ""
    })
  }

  const onDeleteButtonClicked = (event) => {
    const itemIdToDelete = parseInt(event.target.id)

    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === itemIdToDelete).name}?`
      )
    ) {
      noteServices
        .deleteById(itemIdToDelete)
        .then((result) => {
          setPersons(persons.filter((person) => person.id !== itemIdToDelete))
        })
        .catch((err) => {
          console.error(err)
        })
    }
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
      <DisplayPersons
        persons={persons}
        filter={filter}
        onDeleteButtonClicked={onDeleteButtonClicked}
      />
    </div>
  )
}

export default App
