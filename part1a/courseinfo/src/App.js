import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  const parts = props.parts

  return (
    <>
      <Part name={parts[0].name} exercise={parts[0].exercises} />
      <Part name={parts[1].name} exercise={parts[1].exercises} />
      <Part name={parts[2].name} exercise={parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  const exercises = props.parts.map((el) => el.exercises)
  console.log(exercises)

  return <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  }

  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    console.log("button is clicked" + counter)
    setCounter(counter + 1)
  }

  return (
    <div style={{ marginLeft: "20px" }}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <CounterButton />
    </div>
  )
}

const CounterButton = () => {
  const [counter, setCounter] = useState(0)
  const handleClick = () => {
    console.log("button is clicked" + counter)
    setCounter(counter + 1)
  }

  return (
    <>
      <Button onClick={handleClick}>Hello I'm a Button</Button>
      <p>{counter}</p>
    </>
  )
}

export default App
