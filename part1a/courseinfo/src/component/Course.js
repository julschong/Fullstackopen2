import React from "react"
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
  const num = course.parts.reduce((sum, el) => sum + el.exercises, 0)

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total num={num} />
    </div>
  )
}

export default Course
