import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer, {
    initializeAnecdotes,
} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdoteService'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then((res) => {
    store.dispatch(initializeAnecdotes(res))
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
