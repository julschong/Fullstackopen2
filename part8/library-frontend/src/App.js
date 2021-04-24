import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Recommendation from './components/Recommendation'
import jwt from 'jsonwebtoken'
import { useSubscription, useApolloClient } from '@apollo/client'
import { NEW_BOOK_ADDED } from './graphql-requests/subscriptions'
import { ALL_BOOKS } from './graphql-requests/queries'

const App = () => {
    const [userinfo, setUserInfo] = useState({})

    const client = useApolloClient()

    useEffect(() => {
        const token = localStorage.getItem('user-token')
        if (token) {
            setUserInfo(
                jwt.verify(token.substring(7), process.env.REACT_APP_SECRET)
            )
        }
    }, [])

    useSubscription(NEW_BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.newBookAdded
            alert(`new book added: ${addedBook.title}`)
            const dataInStore = client.readQuery({ query: ALL_BOOKS })
            if (
                dataInStore &&
                !dataInStore.allBooks.some((book) => book.id === addedBook.id)
            ) {
                client.writeQuery({
                    query: ALL_BOOKS,
                    data: { allBooks: dataInStore.allBooks.concat(addedBook) },
                })
            }
        },
    })

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
