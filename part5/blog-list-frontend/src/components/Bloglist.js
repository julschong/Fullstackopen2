import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BlogItem from './BlogItem'
import './Bloglist.css'

const Bloglist = ({ blogs }) => {
    return (
        <div className="blog-list">

            {blogs.map(blog => <BlogItem key={blog.id + "-root"} blog={blog} />)}

        </div>
    )
}

export default Bloglist
