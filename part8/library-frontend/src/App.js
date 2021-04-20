import React from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'

const App = () => {
    return (
        <div>
            <NavBar />

            <Route path="/authors">
                <Authors />
            </Route>
            <Route path="/books">
                <Books />
            </Route>
            <Route path="/add">
                <NewBook />
            </Route>
            <Route path="/login">
                <div>Login</div>
            </Route>
            <Route exact path="/">
                Home
            </Route>
        </div>
    )
}

export default App
