import React from "react"

const Hello = (props) => {
  return (
    <div>
      <p>Hello Word {props.name}</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  console.log("Hello from component")
  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <Hello name="Julius" />
      <Hello name="Christine" />
      <Hello name="LALA" />
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

export default App
