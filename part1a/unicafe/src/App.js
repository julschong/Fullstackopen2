import React, { useState } from "react"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <MyButton name="good" handleClick={() => setGood(good + 1)} />
      <MyButton name="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <MyButton name="bad" handleClick={() => setBad(bad + 1)} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = () => {
  return <h1>give feedback</h1>
}

const MyButton = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>
}

const Stats = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  let avg = (good - bad) / total
  let positive = good / total

  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <h3>No feedback given</h3>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <MyLabel text="good" num={good} />
      <br></br>
      <MyLabel text="netral" num={neutral} />
      <br></br>
      <MyLabel text="bad" num={bad} />
      <br></br>
      <MyLabel text="average" num={avg} />
      <br></br>
      <MyLabel text="positive" num={positive} /> %
    </>
  )
}

const MyLabel = ({ text, num }) => {
  return (
    <>
      {text} <span style={{ paddingLeft: "20px" }} />
      {num}
    </>
  )
}

export default App
