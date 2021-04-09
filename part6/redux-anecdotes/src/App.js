import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    const addVoteAction = {
      type: "Upvote",
      data: {id: id}
    }
    dispatch(addVoteAction)
  }

  const createNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.reset()
    const addAnecdoteAction = {
      type: "addNew",
      data: content
    }
    dispatch(addAnecdoteAction)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input name="newAnecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App