import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { useState, useEffect } from 'react'

import blogService from './services/blogService'
import loginService from './services/loginService'
import registerUserService from './services/registerUserService'

import BlogList from './components/Bloglist'
import CreateNewBlog from './components/CreateNewBlog'
import LoginForm from './components/LoginForm'
import RegisterUserForm from './components/RegisterUserForm'
import Notification from './components/Notification'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const LOGGED_IN = "LOGGED_IN"
const NOT_LOGGED_IN = "NOT_LOGGED_IN"
const REGISTERING = "REGISTERING"


const App = () => {

    const [appState, setAppState] = useState(NOT_LOGGED_IN)
    const [userFile, setUserFile] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState({})

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [newContent, setNewContent] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [blogs, setBlogs] = useState([])

    const [fullname, setFullName] = useState('')

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


    const submitButtonClicked = async (e) => {
        e.preventDefault();
        const submitter = e.nativeEvent.submitter.name
        switch (submitter) {
            case "login":
                if (!username || !password) {
                    return displayNotificationMessage("username and password cannot be empty", "Red", 2000)
                }
                const userInfo = {
                    username: username,
                    password: password
                }
                try {
                    const credential = await loginService.login(userInfo)
                    setUserFile(credential)
                    window.localStorage.setItem('token', JSON.stringify(credential))
                    displayNotificationMessage('Logged In', "Green", 3000)
                    setAppState(LOGGED_IN)
                } catch (err) {
                    displayNotificationMessage(err.response.data.error, "Red", 3000)
                    return
                }
                break

            case "save":
                if (newTitle === '' || newAuthor === '') {
                    return displayNotificationMessage("Title and Author cannot be Empry", "Red", 3000)
                }
                const newBlog = {
                    title: newTitle,
                    author: newAuthor,
                    url: newURL || "no url",
                    content: newContent || "no content"
                }

                try {
                    const blog = await blogService.createOne(newBlog, userFile.token)
                    setBlogs(blogs.concat(blog))
                    displayNotificationMessage("blog is saved succesfully", "Green", 3000)
                } catch (err) {
                    displayNotificationMessage(err.message, "Red", 2000)
                    return
                }
                break

            case "logout":
                window.localStorage.removeItem('token')
                if (window.confirm('Are you sure you would like to log out?')) {
                    setUserFile(null)
                    setAppState(NOT_LOGGED_IN)
                }
                break

            case "register-screen":
                setAppState(REGISTERING)
                break

            case "register":


                const userForRegister = {
                    username: username,
                    password: password,
                    name: fullname
                }
                try {
                    await registerUserService.registerUser(userForRegister)
                    displayNotificationMessage("Successfully Registered, Please Log in", "Green", 3000)

                } catch (err) {
                    displayNotificationMessage(JSON.stringify(err.response.data.error), "Red", 5000)
                }
                setFullName('')
                setAppState(NOT_LOGGED_IN)
                break

            case "back":
                setFullName('')
                setAppState(NOT_LOGGED_IN)
                break

            default:

        }
        e.target.reset()
        setUsername('')
        setPassword('')
    }

    const displayUserInterface = () => {
        switch (appState) {
            case NOT_LOGGED_IN:
                return (<LoginForm className="login-form"
                    submitButtonClicked={submitButtonClicked}
                    setUsername={setUsername}
                    setPassword={setPassword} />)
            case LOGGED_IN:
                return (<CreateNewBlog className="newBlog"
                    submitButtonClicked={submitButtonClicked}
                    setNewTitle={setNewTitle}
                    setNewAuthor={setNewAuthor}
                    setNewURL={setNewURL}
                    setNewContent={setNewContent} />)
            case REGISTERING:
                return (<RegisterUserForm className="register-form"
                    submitButtonClicked={submitButtonClicked}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setFullName={setFullName} />)
            default:
        }
    }

    return (
        <div className="App">
            <h1>My Blog</h1>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    {isEmpty(notificationMessage)
                        ? null
                        : <Notification text={notificationMessage.text} color={notificationMessage.color} />}
                    {displayUserInterface()}


                    {appState === LOGGED_IN
                        ? <BlogList blogs={blogs} />
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
