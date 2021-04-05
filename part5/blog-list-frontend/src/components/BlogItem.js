import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogItem = ({ blog }) => {

    const date = new Date(blog.createdAt)
    const formattedDate = date.getFullYear() + '/' +
        (date.getMonth() + 1) + '/' +
        date.getDate() + ' - ' +
        date.getHours() + ':' +
        date.getMinutes()

    return (
        <ListGroup.Item>
            <Card>
                <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Title className="author">{blog.author}</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum elit dolor, sit amet maximus libero mollis non. Nulla in arcu euismod, mattis leo rhoncus, dignissim sapien. Nullam quis augue quis felis pellentesque gravida et at diam. Curabitur laoreet feugiat risus, sit amet iaculis ipsum bibendum a. Donec sit amet finibus lorem. Curabitur accumsan vehicula velit sed ullamcorper. Nulla facilisi.

Vestibulum at aliquam ligula. Aliquam tincidunt tortor eu tincidunt rutrum. Nulla venenatis porta placerat. Nullam mauris dui, rhoncus id pellentesque ut, mattis ac justo. In auctor libero ac erat hendrerit pharetra. Morbi cursus nulla eros, et elementum ipsum egestas eget.</Card.Text>
                    <Card.Text className="url">{blog.url}</Card.Text>
                    <Card.Text>{formattedDate}</Card.Text>
                </Card.Body>
            </Card>
        </ListGroup.Item>
    )
}

export default BlogItem
