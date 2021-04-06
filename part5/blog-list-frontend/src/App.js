import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LoginForm from './components/LoginForm'
import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/loginService'
import BlogList from './components/Bloglist'
import CreateNewBlog from './components/CreateNewBlog'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

let userFile = JSON.parse(window.localStorage.getItem('token')) || null
const initialization = userFile ? 'Logged In' : 'Start'

const App = () => {

    const [appState, setAppState] = useState(initialization)

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
                } catch (err) {
                    console.log(err.message)
                    return
                }
                break

            case "save":
                const newBlog = {
                    title: newTitle,
                    author: newAuthor,
                    url: newURL
                }

                try {
                    const blog = await blogService.createOne(newBlog, userFile.token)
                    console.log(blog)
                    setBlogs(blogs.concat(blog))
                } catch (err) {
                    console.log(err.message)
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
                    {appState === 'Start'
                        ? <LoginForm className="login-form"
                            submitButtonClicked={submitButtonClicked}
                            setUsername={setUsername}
                            setPassword={setPassword} />
                        : <CreateNewBlog className="newBlog"
                            submitButtonClicked={submitButtonClicked} setNewTitle={setNewTitle}
                            setNewAuthor={setNewAuthor}
                            setNewURL={setNewURL} />}


                    <BlogList blogs={[...blogs].sort((a, b) => (a.createdAt < b.createdAt))} />
                </Tab>
                <Tab eventKey="profile" title="Profile">
                </Tab>
            </Tabs>
        </div >
    )
}

export default App;
