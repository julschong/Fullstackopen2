import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import BlogItem from './BlogItem'
import './Bloglist.css'

const Bloglist = ({ blogs }) => {
    return (
        <div className="blog-list">
            <ListGroup>
                {blogs.map(blog => <BlogItem blog={blog} />)}
            </ListGroup>
        </div>
    )
}

export default Bloglist
