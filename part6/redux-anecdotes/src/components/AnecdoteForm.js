import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../utils/notificationHelper'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification)

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.reset()
        const res = await anecdoteService.createOne(content)
        dispatch(createNewAnecdote(res.content))
        displayNotification(
            notification,
            dispatch,
            'New note added',
            'Green',
            3000
        )
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
