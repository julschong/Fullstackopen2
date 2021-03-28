import React from "react"
import Part from "./Part"

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((el) => (
        <Part name={el.name} exercise={el.exercises} key={el.id} />
      ))}
    </>
  )
}

export default Content
