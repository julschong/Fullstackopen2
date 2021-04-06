import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { useState, useEffect } from 'react'

import blogService from './services/blogService'
import loginService from './services/loginService'

import BlogList from './components/Bloglist'
import CreateNewBlog from './components/CreateNewBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

let userFile = JSON.parse(window.localStorage.getItem('token')) || null
const initialization = userFile ? 'Logged In' : 'Start'

const App = () => {

    const [appState, setAppState] = useState(initialization)
    const [notificationMessage, setNotificationMessage] = useState({})

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }, [appState])

    const dispayNotificationMessage = (text, color, duration) => {
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
                const userInfo = {
                    username: username,
                    password: password
                }
                try {
                    const credential = await loginService.login(userInfo)
                    console.log(credential)
                    window.localStorage.setItem('token', JSON.stringify(credential))
                    setAppState('Logged In')
                    dispayNotificationMessage('Logged In', "Green", 3000)
                } catch (err) {
                    console.log(err.message)
                    return
                }
                break

            case "save":
                if (newTitle === '' || newAuthor === '') {
                    return dispayNotificationMessage("Title and Author cannot be Empry", "Red", 3000)
                }
                const newBlog = {
                    title: newTitle,
                    author: newAuthor,
                    url: newURL || "no url"
                }

                try {
                    const blog = await blogService.createOne(newBlog, userFile.token)
                    setBlogs(blogs.concat(blog))
                    dispayNotificationMessage("blog is saved succesfully", "Green", 3000)
                } catch (err) {
                    dispayNotificationMessage(err.message, "Red", 2000)
                    return
                }
                break

            default:

        }
        e.target.reset()
        setUsername('')
        setPassword('')
    }

    return (
        <div className="App">
            <h1>My Blog</h1>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    {isEmpty(notificationMessage)
                        ? null
                        : <Notification text={notificationMessage.text} color={notificationMessage.color} />}

                    {appState === 'Start'
                        ? <LoginForm className="login-form"
                            submitButtonClicked={submitButtonClicked}
                            setUsername={setUsername}
                            setPassword={setPassword} />
                        : <CreateNewBlog className="newBlog"
                            submitButtonClicked={submitButtonClicked} setNewTitle={setNewTitle}
                            setNewAuthor={setNewAuthor}
                            setNewURL={setNewURL} />}


                    <BlogList blogs={blogs} />
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
