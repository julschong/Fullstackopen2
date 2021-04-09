import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {createNewAnecdote, vote} from './reducers/anecdoteReducer'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App