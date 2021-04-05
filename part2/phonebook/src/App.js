import React, { useState, useEffect } from "react"
import AddPersonForm from "./component/AddPersonForm"
import DisplayPersons from "./component/DisplayPersons"
import Filter from "./component/Filter"
import Notification from "./component/Notification"
import personServices from "./services/PersonServices"

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
    personServices.getAll().then((response) => {
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

        personServices
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
          .catch((err) => {
            DisplayNotifMessage(`${err.response.data.error}`, "Red", 5000)
          })
      }
      return
    } else if (newName === "" || newNumber === "") {
      alert(`Name and Number cannot be empty`)
      return
    }

    personServices
      .create(newPerson)
      .then((newAddedPerson) => {
        const newPersons = persons.concat(newAddedPerson)
        setPersons(newPersons)
        setNewName("")
        setNewNumber("")
        event.target[0].value = ""
        event.target[1].value = ""
        DisplayNotifMessage(`${newAddedPerson.name} is added`, "green", 2000)
      })
      .catch((err) => {
        DisplayNotifMessage(`${err.response.data.error}`, "Red", 5000)
      })
  }

  const onDeleteButtonClicked = (event) => {
    const itemIdToDelete = event.target.id
    personServices.findOne(itemIdToDelete).then((result) => {
      const localPersonToBeDeleted = persons.find(
        (p) => p.id === itemIdToDelete
      )
      console.log(localPersonToBeDeleted)

      if (window.confirm(`Delete ${result.name}?`)) {
        personServices
          .deleteById(itemIdToDelete)
          .then((result) => {
            DisplayNotifMessage(
              `Deleted ${localPersonToBeDeleted.name}`,
              "red",
              2000
            )
            setPersons(persons.filter((person) => person.id !== itemIdToDelete))
          })
          .catch((err) => {
            if (err.response.status === 404) {
              DisplayNotifMessage(
                `${localPersonToBeDeleted.name} is already removed from server`,
                "red",
                2000
              )
              setPersons(
                persons.filter((person) => person.id !== itemIdToDelete)
              )
            }
          })
      }
    })
  }

  return (
    <div className="app-container">
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
