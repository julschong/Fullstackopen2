import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './CreateNewBlog.css'

const CreateNewBlog = ({ submitButtonClicked, setNewTitle, setNewAuthor, setNewURL, setNewContent }) => {
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
            <Form.Control type="text" placeholder="http://" defaultValue="http://"
                onChange={(event) => setNewURL(event.target.value)}
            />

            <Form.Label>Content</Form.Label>
            <Form.Control id="content" as="textarea" placeholder="Content" row={5} maxLength={255}
                onChange={(event) => setNewContent(event.target.value)} />

            <br></br>
            <Button id="save-button" variant="outline-primary"
                type="submit" name="save">save</Button>

            <Button id="clear-button" variant="outline-primary"
                type="submit" name="clear">clear</Button>

            <Button id="logout-button" variant="outline-primary"
                type="submit" name="logout">logout</Button>

        </Form>
    )
}

export default CreateNewBlog
