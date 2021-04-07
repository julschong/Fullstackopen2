import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BlogItem from './BlogItem'
import blogService from '../services/blogService'
import './Bloglist.css'

const Bloglist = ({ blogs, userFile, setBlogs }) => {

    const sortedblogs = [...blogs].sort((a, b) => (a.id < b.id) ? 1 : -1)

    const deleteButtonClicked = async (e) => {
        const blogId = e.target.name
        try {
            const blog = blogs.find(blog => blog.id === blogId)
            if (window.confirm(`Delete blog: ${blog.title} ?`)) {
                await blogService.deleteOne(blog, userFile.token)
                setBlogs(blogs.filter(blog => blog.id !== e.target.name))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="blog-list">
            {sortedblogs.map(blog => <BlogItem key={blog.id + "-root"} blog={blog} userFile={userFile} setBlogs={setBlogs} deleteButtonClicked={deleteButtonClicked} />)}
        </div>
    )
}

export default Bloglist
