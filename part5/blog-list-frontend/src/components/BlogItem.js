import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ToggleButton from './ToggleButton'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BlogItem.css'

const BlogItem = ({ blog, userFile, deleteButtonClicked, likeButtonClicked }) => {

    const date = new Date(blog.createdAt)
    const formattedDate = date.getFullYear() + '/' +
        (date.getMonth() + 1) + '/' +
        date.getDate() + ' - ' +
        date.getHours() + ':' +
        date.getMinutes()

    const deleteButtonVisible = { display: blog.user.username === userFile.username ? '' : 'none' }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <ToggleButton className="content">
                    <Card.Text >{blog.content}</Card.Text>
                    <Card.Text className="url">{blog.url}</Card.Text>
                    <Card.Text >{formattedDate}</Card.Text>
                    <Card.Text className="likes">Likes: {blog.likes}</Card.Text>
                    <Button className="like-button" variant="outline-primary" name={`${blog.id}`} onClick={likeButtonClicked}>like</Button>
                    <Button className="delete-button" name={`${blog.id}`} onClick={deleteButtonClicked} style={deleteButtonVisible} variant="outline-primary">delete</Button>
                </ToggleButton>
                <Card.Title className="author">{blog.author}</Card.Title>

            </Card.Body>
        </Card>
    )
}

export default BlogItem
