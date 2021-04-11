import React from 'react'

const Anecdote = ({ anecdoteById }) => {
    return (
        <div>
            <h1>{anecdoteById.content}</h1>
            <p>has {anecdoteById.votes} votes</p>
            <p>
                more info see{' '}
                <a href={anecdoteById.info}>{anecdoteById.info}</a>
            </p>
        </div>
    )
}

export default Anecdote
