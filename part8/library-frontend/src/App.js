import React from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'

const App = () => {
    return (
        <div>
            <NavBar />
            <Route exact path="/">
                Home
            </Route>
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
                <Login />
            </Route>
        </div>
    )
}

export default App
