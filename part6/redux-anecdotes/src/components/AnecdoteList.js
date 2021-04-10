import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../utils/notificationHelper'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdote)
    const notification = useSelector((state) => state.notification)
    const filter = useSelector((state) => state.filter)

    const voteButtonClick = (e) => {
        const anecdoteId = e.target.name
        const anecdote = anecdotes.find(
            (anecdote) => anecdote.id === anecdoteId
        )
        dispatch(vote(anecdoteId))
        displayNotification(
            notification,
            dispatch,
            `you voted '${anecdote.content}'`,
            'Green',
            3000
        )
    }

    const filteredAnecdotes = () => {
        return filter
            ? anecdotes.filter((anecdote) =>
                  anecdote.content.toLowerCase().includes(filter.toLowerCase())
              )
            : anecdotes
    }

    return (
        <div>
            {filteredAnecdotes().map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button name={anecdote.id} onClick={voteButtonClick}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
