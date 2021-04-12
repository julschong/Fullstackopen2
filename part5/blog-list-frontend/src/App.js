import './App.css'
import React, { useState, useEffect } from 'react'

import BlogList from './components/Bloglist'
import Notification from './components/Notification'

import { LOGGED_IN, NOT_LOGGED_IN } from './utils/appStates'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import UserInterface from './components/UserInterface'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'

const App = () => {

    // get dispatch handle
    const dispatch = useDispatch()

    // appState uses constants from appState.js to determine state of the app.
    const [appState, setAppState] = useState(NOT_LOGGED_IN)

    // state to track user login object - token, username, name
    const [userFile, setUserFile] = useState(null)

    // state to track blogs to be fetched, set, updated, displayed
    // useRedux blogReducer
    const blogs = useSelector(state => state.blogs)
    // const [blogs, setBlogs] = useState([])

    // 1. initial fetch to get login info from browser local storage
    //      if success, set userFile and set appState to LOGGED_IN
    // 2. initial fetch all blogs from backend
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('token')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUserFile(user)
            setAppState(LOGGED_IN)
        }
        dispatch(initBlogs())
    }, [])

    return (
        <div className="App">
            <header id="app-header">
                <h1 id="app-title">My Blog</h1>
                <h5 id="log-status">{userFile ? `Logged in as ${userFile.username}` : null}</h5>
            </header>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    {/* display notificationMessage if not empty */}
                    <Notification />

                    {/* UserInterface: LoginForm or RegistrationForm or NewBlogForm will display
                            depending on appState */}
                    <UserInterface
                        appState={appState}
                        setUserFile={setUserFile}
                        setAppState={setAppState}
                        userFile={userFile}
                    />

                    {/* only display blogs when LOGGED IN */}
                    {appState === LOGGED_IN
                        ? <BlogList blogs={blogs} userFile={userFile} />
                        : null}

                </Tab>
                <Tab eventKey="profile" title="Profile">
                </Tab>
            </Tabs>
        </div >
    )
}

export default App
