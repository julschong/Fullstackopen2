import React, { useState, useEffect } from "react"
import AddPersonForm from "./component/AddPersonForm"
import DisplayPersons from "./component/DisplayPersons"
import Filter from "./component/Filter"
import Notification from "./component/Notification"
import noteServices from "./services/NoteServices"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notifMessage, setNotifMessage] = useState([])

  const DisplayNotifMessage = (message, color, milliseconds) => {
    if (JSON.stringify(notifMessage) !== "[]") {
      clearTimeout(notifMessage[2])
    }
    setNotifMessage([
      message,
      color,
      setTimeout(() => {
        setNotifMessage([])
      }, milliseconds),
    ])
  }

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
    const foundPerson = persons.find((person) => person.name === newName)
    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook\ndo you want to update number from ${foundPerson.number} to ${newNumber}?`
        )
      ) {
        const updatingPersonWithId = { ...newPerson, id: foundPerson.id }

        noteServices
          .updatePersonById(foundPerson.id, updatingPersonWithId)
          .then((result) => {
            const newPersons = persons
              .filter((person) => person.id !== foundPerson.id)
              .concat(updatingPersonWithId)
            setPersons(newPersons)
            setNewName("")
            setNewNumber("")
            event.target[0].value = ""
            event.target[1].value = ""

            DisplayNotifMessage(`${foundPerson.name} is updated`, "green", 2000)
          })
      }
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
      DisplayNotifMessage(`${newAddedPerson.name} is added`, "green", 2000)
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
          DisplayNotifMessage(
            `Deleted ${
              persons.find((person) => person.id === itemIdToDelete).name
            }`,
            "red",
            2000
          )
          setPersons(persons.filter((person) => person.id !== itemIdToDelete))
        })
        .catch((err) => {
          DisplayNotifMessage(
            `${
              persons.find((person) => person.id === itemIdToDelete).name
            } is already removed from server`,
            "red",
            2000
          )
          setPersons(persons.filter((person) => person.id !== itemIdToDelete))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <Filter onInputFilterChange={onInputFilterChange} />
      <h2>Add a New</h2>
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
