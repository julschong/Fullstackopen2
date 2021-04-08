import React, { useState, useRef } from 'react'
import { LOGGED_IN, NOT_LOGGED_IN, REGISTERING } from '../utils/appStates'
import LoginForm from '../components/LoginForm'
import CreateNewBlog from '../components/CreateNewBlog'
import RegisterUserForm from '../components/RegisterUserForm'
import ToggleButton from '../components/ToggleButton'
import Button from 'react-bootstrap/Button'

import blogService from '../services/blogService'
import loginService from '../services/loginService'
import registerUserService from '../services/registerUserService'


const UserInterface = ({ appState, displayNotificationMessage, setUserFile, setAppState, userFile, setBlogs, blogs }) => {
    // states for newBlog form
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [newContent, setNewContent] = useState('')

    const blogFromRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullName] = useState('')

    // master submit button clicked method
    // gets called by form submit from button: login, save, logout, register-screen, register
    const submitButtonClicked = async (e) => {
        e.preventDefault()

        // submitter is set to the function callers name (button name attribute)
        const submitter = e.nativeEvent.submitter.name

        const userInfo = {
            username: username,
            password: password
        }

        const newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newURL || 'no url',
            content: newContent || 'no content'
        }

        const userForRegister = {
            username: username,
            password: password,
            name: fullname
        }
        // execute different actions for different buttons
        switch (submitter) {

        // send post to /api/login to retrieve credential then store in local storage
        // display wrong credential if username/password is wrong
        case 'login':
            if (!username || !password) {
                return displayNotificationMessage('username and password cannot be empty', 'Red', 2000)
            }

            try {
                const credential = await loginService.login(userInfo)
                setUserFile(credential)
                window.localStorage.setItem('token', JSON.stringify(credential))
                displayNotificationMessage('Logged In', 'Green', 3000)
                setAppState(LOGGED_IN)
            } catch (err) {
                displayNotificationMessage('Wrong credentials', 'Red', 3000)
                return
            }
            break

            // saving new Blog
        case 'save':
            if (newTitle === '' || newAuthor === '') {
                return displayNotificationMessage('Title and Author cannot be Empty', 'Red', 3000)
            }

            try {
                const blog = await blogService.createOne(newBlog, userFile.token)
                setBlogs(blogs.concat(blog))
                displayNotificationMessage('blog is saved succesfully', 'Green', 3000)
                blogFromRef.current.toggle(false)

            } catch (err) {
                displayNotificationMessage(err.message, 'Red', 2000)
                return
            }
            break

            // set appstate to REGISTERING to display registration form
        case 'register-screen':
            setAppState(REGISTERING)
            break

            // post to /api/users to create new user, then switch appstate to NOT_LOGGED_IN to have user log in
        case 'register':

            try {
                await registerUserService.registerUser(userForRegister)
                displayNotificationMessage('Successfully Registered, Please Log in', 'Green', 3000)

            } catch (err) {
                displayNotificationMessage(JSON.stringify(err.response.data.error), 'Red', 5000)
                return
            }
            setFullName('')
            setAppState(NOT_LOGGED_IN)
            break

            // back button from registration form to get back to login form
        case 'back':
            setFullName('')
            setAppState(NOT_LOGGED_IN)
            break

        default:

        }
        e.target.reset()
        setUsername('')
        setPassword('')
    }

    // display 1 of 3 forms: login, newblog, registration form
    // based on 3 appStates: NOT_LOGGED_IN, LOGGED_IN, REGISTERING
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

    const logoutClicked = () => {
        // logout by deleting local storage credential
        window.localStorage.removeItem('token')
        if (window.confirm('Are you sure you would like to log out?')) {
            setUserFile(null)
            setAppState(NOT_LOGGED_IN)
            blogFromRef.current.toggle(true)
        }
    }

    return (
        <>
            <Button id="logout-button" variant="outline-primary" style={{ display: (appState === LOGGED_IN) ? '' : 'none' }}
                onClick={logoutClicked} name="logout">logout</Button>
            <ToggleButton className="toggle-container" appState={appState} ref={blogFromRef}>
                {displayUserInterface()}
            </ToggleButton>
        </>
    )
}

export default UserInterface
