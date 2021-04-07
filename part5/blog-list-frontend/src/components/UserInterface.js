import React, { useState, useRef } from 'react'
import { LOGGED_IN, NOT_LOGGED_IN, REGISTERING } from '../utils/appStates'
import LoginForm from '../components/LoginForm'
import CreateNewBlog from '../components/CreateNewBlog'
import RegisterUserForm from '../components/RegisterUserForm'
import ToggleButton from '../components/ToggleButton'

import blogService from '../services/blogService'
import loginService from '../services/loginService'
import registerUserService from '../services/registerUserService'


const UserInterface = ({ appState, displayNotificationMessage, setUserFile, setAppState, userFile, setBlogs, blogs }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [newContent, setNewContent] = useState('')

    const blogFromRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullName] = useState('')

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
                    return displayNotificationMessage("Title and Author cannot be Empty", "Red", 3000)
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
                    blogFromRef.current.toggle()

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
                    return
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
        <ToggleButton ref={blogFromRef}>
            {displayUserInterface()}
        </ToggleButton>
    )
}

export default UserInterface
