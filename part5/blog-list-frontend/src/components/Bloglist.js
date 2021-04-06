import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BlogItem from './BlogItem'
import './Bloglist.css'

const Bloglist = ({ blogs }) => {

    const sortedblogs = [...blogs].sort((a, b) => (a.id < b.id) ? 1 : -1)

    return (
        <div className="blog-list">

            {sortedblogs.map(blog => <BlogItem key={blog.id + "-root"} blog={blog} />)}

        </div>
    )
}

export default Bloglist
