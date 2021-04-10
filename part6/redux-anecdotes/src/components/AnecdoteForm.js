import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification)

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.reset()
        dispatch(createNewAnecdote(content))
        displayNotification('New note added', 'Green', 3000)
    }

    const displayNotification = (message, color, duration) => {
        if (JSON.stringify(notification) !== '{}') {
            clearTimeout(notification.timeoutId)
        }
        const timeoutId = setTimeout(() => {
            dispatch(setNotification())
        }, duration)
        dispatch(setNotification(message, color, timeoutId))
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
