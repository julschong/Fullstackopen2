import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './LoginForm.css'


const LoginForm = ({ setUsername, setPassword, className, submitButtonClicked }) => {
    return (
        <Form className={className} onSubmit={submitButtonClicked}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username"
                onChange={(event) => setUsername(event.target.value)} />

            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)} />
            <br></br>
            <Button id="login-button" variant="outline-primary"
                type="submit" name="login">login</Button>

            <Button id="register-button-on-login" variant="outline-primary"
                type="submit" name="register-screen">register</Button>
        </Form>
    )
}

export default LoginForm
