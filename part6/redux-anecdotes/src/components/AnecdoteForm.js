import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../utils/notificationHelper'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification)

    const addAnecdote = (event) => {
        event.preventDefault()

        const content = event.target.newAnecdote.value
        dispatch(createNewAnecdote(content))

        displayNotification(
            notification,
            dispatch,
            'New note added',
            'Green',
            3000
        )
        event.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="newAnecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
