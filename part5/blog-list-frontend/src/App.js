import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LoginForm from './components/LoginForm'
import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import BlogList from './components/Bloglist'


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
    e.target.reset()
    setUsername('')
    setPassword('')
  }

  return (
    <div className="App">
      <h1>My Blog</h1>
      <LoginForm className="login-form"
        submitButtonClicked={submitButtonClicked}
        setUsername={setUsername}
        setPassword={setPassword} />
      <BlogList blogs={blogs} />

    </div >
  )
}

export default App;
