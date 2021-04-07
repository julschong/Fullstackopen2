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

    const [appState, setAppState] = useState(NOT_LOGGED_IN)
    const [userFile, setUserFile] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState({})

    const [blogs, setBlogs] = useState([])



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

    const displayNotificationMessage = (text, color, duration) => {
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
            <h1>My Blog</h1>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    {isEmpty(notificationMessage)
                        ? null
                        : <Notification text={notificationMessage.text} color={notificationMessage.color} />}

                    <UserInterface
                        appState={appState}
                        displayNotificationMessage={displayNotificationMessage}
                        setUserFile={setUserFile}
                        setAppState={setAppState}
                        userFile={userFile}
                        setBlogs={setBlogs}
                        blogs={blogs}
                    />

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



const isEmpty = (object) => {
    return JSON.stringify(object) === '{}'
}

export default App;
