import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './RegisterUserForm.css'

const RegisterUserForm = ({ submitButtonClicked, setUsername, setPassword, setFullName }) => {
    return (
        <Form className="registration-form" onSubmit={submitButtonClicked}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username"
                onChange={(event) => setUsername(event.target.value)} />

            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)} />

            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Full Name"
                onChange={(event) => setFullName(event.target.value)} />
            <br></br>
            <Button id="register-button" variant="outline-primary"
                type="submit" name="register">register</Button>

            <Button id="back-button" variant="outline-primary"
                type="submit" name="back">back</Button>
        </Form>
    )
}

export default RegisterUserForm
