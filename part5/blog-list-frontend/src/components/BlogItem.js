import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BlogItem.css'

const BlogItem = ({ blog }) => {

    const date = new Date(blog.createdAt)
    const formattedDate = date.getFullYear() + '/' +
        (date.getMonth() + 1) + '/' +
        date.getDate() + ' - ' +
        date.getHours() + ':' +
        date.getMinutes()

    return (
        <Card>
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Title className="author">{blog.author}</Card.Title>
                <Card.Text >{blog.content}</Card.Text>
                <Card.Text className="url">{blog.url}</Card.Text>
                <Card.Text >{formattedDate}</Card.Text>
                <Card.Text className="likes">Likes: {blog.likes}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BlogItem
