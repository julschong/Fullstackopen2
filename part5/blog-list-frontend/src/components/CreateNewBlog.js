import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './CreateNewBlog.css'

const CreateNewBlog = ({ submitButtonClicked, setNewTitle, setNewAuthor, setNewURL }) => {
    return (
        <Form className="newBlog" onSubmit={submitButtonClicked}>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title"
                onChange={(event) => setNewTitle(event.target.value)}
            />

            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Author"
                onChange={(event) => setNewAuthor(event.target.value)}
            />

            <Form.Label>Url</Form.Label>
            <Form.Control type="url" placeholder="http://"
                onChange={(event) => setNewURL(event.target.value)}
            />
            <br></br>
            <Button id="save-button" variant="outline-primary"
                type="submit" name="save">save</Button>

            <Button id="clear-button" variant="outline-primary"
                type="submit" name="clear">clear</Button>

        </Form>
    )
}

export default CreateNewBlog
