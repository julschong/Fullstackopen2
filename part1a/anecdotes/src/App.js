import React, { useState } from "react"

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ]

  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
  const [maxValue, maxIndex] = useState([0, 0]) //[maxValue, maxIndex]

  const chooseAnecdoteNumber = () => {
    let result
    do {
      result = Math.floor(Math.random() * anecdotes.length)
    } while (result === selected)

    return result
  }

  const upVote = (index) => {
    const copy = { ...scores }
    copy[index]++
    setScores(copy)
    if (copy[index] > maxValue[0]) {
      maxIndex([copy[index], index])
    }
    console.log(maxValue)
  }

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        score={scores[selected]}
      />
      <MyButton name="vote" handleClick={() => upVote(selected)} />
      <MyButton
        name="next anecdote"
        handleClick={() => setSelected(chooseAnecdoteNumber())}
      />
      <Anecdote
        title="Anecdote with most votes"
        anecdote={anecdotes[maxValue[1]]}
        score={scores[maxValue[1]]}
      />
    </div>
  )
}

const Anecdote = ({ title, anecdote, score }) => {
  return (
    <>
      <h1>{title}</h1>
      {anecdote}
      <br></br>
      has {score} votes
      <br></br>
    </>
  )
}

const MyButton = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>
}

export default App
