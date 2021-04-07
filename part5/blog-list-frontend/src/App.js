import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { useState, useEffect } from 'react'

import blogService from './services/blogService'

import BlogList from './components/Bloglist'
import Notification from './components/Notification'


import { LOGGED_IN, NOT_LOGGED_IN } from './utils/appStates'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import UserInterface from './components/UserInterface'




const App = () => {
    // appState uses constants from appState.js to determine state of the app.
    const [appState, setAppState] = useState(NOT_LOGGED_IN)

    // state to track user login object - token, username, name
    const [userFile, setUserFile] = useState(null)

    // state to track current displayed notification message
    // uses 3 properties - 
    //text: text to display
    //color: color of notification
    //duration: message duration in milliseconds
    const [notificationMessage, setNotificationMessage] = useState({})

    // state to track blogs to be fetched, set, updated, displayed
    const [blogs, setBlogs] = useState([])

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

        blogService.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }, [])

    // function to display Notification Message
    const displayNotificationMessage = (text, color, duration) => {
        // check to see if any existing message exists.
        // if so, clear it, then display new message
        if (!isEmpty(notificationMessage)) {
            setNotificationMessage({})
            clearTimeout(notificationMessage.timeout)
        }

        const timeOutNumber = setTimeout(() => {
            setNotificationMessage({})
        }, duration)
        setNotificationMessage({ text: text, color: color, timeout: timeOutNumber })

    }

    return (
        <div className="App">
            <header id="app-header">
                <h1 id="app-title">My Blog</h1>
                <h5 id="log-status">{userFile ? `Logged in as ${userFile.username}` : null}</h5>
            </header>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    {/* display notificationMessage if not empty */}
                    {isEmpty(notificationMessage)
                        ? null
                        : <Notification text={notificationMessage.text} color={notificationMessage.color} />}

                    {/* UserInterface: LoginForm or RegistrationForm or NewBlogForm will display
                            depending on appState */}
                    <UserInterface
                        appState={appState}
                        displayNotificationMessage={displayNotificationMessage}
                        setUserFile={setUserFile}
                        setAppState={setAppState}
                        userFile={userFile}
                        setBlogs={setBlogs}
                        blogs={blogs}
                    />

                    {/* only display blogs when LOGGED IN */}
                    {appState === LOGGED_IN
                        ? <BlogList blogs={blogs} userFile={userFile} setBlogs={setBlogs} />
                        : null}

                </Tab>
                <Tab eventKey="profile" title="Profile">
                </Tab>
            </Tabs>
        </div >
    )
}

// helper method to check for empty object
const isEmpty = (object) => {
    return JSON.stringify(object) === '{}'
}

export default App;
