import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql-requests/mutations'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

const Login = ({ userinfo, setUserInfo }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useMutation(LOGIN, {
        onError: (e) => console.log(e.message),
    })

    const onSubmitLogin = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('user-token')
        if (token) {
            localStorage.removeItem('user-token')
        }
        const result = await login({ variables: { username, password } })
        if (result) {
            localStorage.setItem(
                'user-token',
                `bearer:${result.data.login.value}`
            )
            setUserInfo(
                jwt.verify(
                    result.data.login.value,
                    process.env.REACT_APP_SECRET
                )
            )
            setUsername('')
            setPassword('')
        }
    }

    const logout = (e) => {
        if (window.confirm(`Logout out from ${userinfo.username}?`)) {
            localStorage.removeItem('user-token')
            setUserInfo({})
        }
    }
    return (
        <>
            {!_.isEmpty(userinfo) ? (
                <div>
                    <h2>logged in as {userinfo.username}</h2>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>log in</h2>
                    <form onSubmit={onSubmitLogin}>
                        <label>username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br /> <br />
                        <label>password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <br />
                        <input type="submit" value="Login" />
                    </form>
                </div>
            )}
        </>
    )
}

export default Login
