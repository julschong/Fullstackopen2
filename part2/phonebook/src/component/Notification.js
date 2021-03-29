import React from "react"

const Notification = ({ message }) => {
  if (isEmpty(message)) {
    return null
  }

  return (
    <div className="error" style={{ color: message[1] }}>
      {message[0]}
    </div>
  )
}
const isEmpty = (array) => {
  return JSON.stringify(array) === "[]"
}

export default Notification
