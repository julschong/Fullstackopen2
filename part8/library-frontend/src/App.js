import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Recommendation from './components/Recommendation'
import jwt from 'jsonwebtoken'

const App = () => {
    const [userinfo, setUserInfo] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('user-token')
        if (token) {
            setUserInfo(
                jwt.verify(token.substring(7), process.env.REACT_APP_SECRET)
            )
        }
    }, [])

    return (
        <div>
            <NavBar userinfo={userinfo} />
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
                <NewBook userinfo={userinfo} />
            </Route>
            <Route path="/recommendation">
                <Recommendation userinfo={userinfo} />
            </Route>
            <Route path="/login">
                <Login userinfo={userinfo} setUserInfo={setUserInfo} />
            </Route>
        </div>
    )
}

export default App
