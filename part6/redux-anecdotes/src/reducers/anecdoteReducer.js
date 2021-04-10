const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    }
}

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
    let nextState = [...state]

    switch (action.type) {
        case 'Upvote':
            const anecdoteId = action.data.id
            const oldAnecdote = state.find(
                (anecdote) => anecdote.id === anecdoteId
            )
            const newAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
            nextState = [
                newAnecdote,
                ...state.filter((anecdote) => anecdote.id !== anecdoteId),
            ]
            break
        case 'addNew':
            nextState = [asObject(action.data), ...state]
            break
        case 'INITIALIZE':
            nextState = action.data
            break
        default:
    }
    nextState.sort((a, b) => b.votes - a.votes)
    return nextState
}

//actions
export const vote = (id) => {
    return {
        type: 'Upvote',
        data: { id: id },
    }
}

export const createNewAnecdote = (content) => {
    return {
        type: 'addNew',
        data: content,
    }
}

export const initializeAnecdotes = (arrayOfAnecdotes) => {
    return {
        type: 'INITIALIZE',
        data: arrayOfAnecdotes,
    }
}

export default anecdoteReducer
