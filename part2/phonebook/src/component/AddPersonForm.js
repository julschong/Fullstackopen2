import React from "react"

const AddPersonForm = ({
  onSubmitAddPerson,
  onInputNameChange,
  onInputNumberChange,
}) => {
  return (
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
  )
}

export default AddPersonForm
