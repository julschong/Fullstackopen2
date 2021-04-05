import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LoginForm from './components/LoginForm'
import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import BlogList from './components/Bloglist'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])


  const submitButtonClicked = (e) => {
    e.preventDefault();
    console.log(e)
    e.target.reset()
    setUsername('')
    setPassword('')
  }

  return (
    <div className="App">
      <h1>My Blog</h1>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <LoginForm className="login-form"
            submitButtonClicked={submitButtonClicked}
            setUsername={setUsername}
            setPassword={setPassword} />
          <BlogList blogs={blogs} />
        </Tab>
        <Tab eventKey="profile" title="Profile">
        </Tab>
      </Tabs>
    </div >
  )
}

export default App;
