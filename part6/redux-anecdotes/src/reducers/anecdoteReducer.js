import anecdoteService from '../services/anecdoteService'

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
        case 'UPVOTE':
            const anecdoteId = action.data.id
            const newAnecdote = action.data
            nextState = [
                newAnecdote,
                ...state.filter((anecdote) => anecdote.id !== anecdoteId),
            ]
            break
        case 'ADD_NEW':
            nextState = [action.data, ...state]
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
    return async (dispatch) => {
        const anecdote = await anecdoteService.getOne(id)
        const toUpdate = { ...anecdote, votes: anecdote.votes + 1 }
        await anecdoteService.updateOne(toUpdate)

        dispatch({
            type: 'UPVOTE',
            data: toUpdate,
        })
    }
}

export const createNewAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createOne(content)
        console.log(newAnecdote)
        dispatch({
            type: 'ADD_NEW',
            data: newAnecdote,
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: anecdotes,
        })
    }
}

export default anecdoteReducer
