import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BlogItem from './BlogItem'
import './Bloglist.css'

import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'


const Bloglist = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const userFile = useSelector(state => state.userFile)

    const sortedblogs = [...blogs].sort((a, b) => (a.likes < b.likes) ? 1 : -1)

    const deleteButtonClicked = (e) => {
        const blog = blogs.find(blog => blog.id===e.target.name)
        dispatch(deleteBlog(blog, userFile))
    }

    const likeButtonClicked = async (e) => {
        const blog = blogs.find(blog => blog.id===e.target.name)
        dispatch(likeBlog(blog))
    }

    return (
        <div className="blog-list">
            {sortedblogs.map(blog => <BlogItem key={blog.id + '-root'} blog={blog} likeButtonClicked={likeButtonClicked} deleteButtonClicked={deleteButtonClicked} />)}
        </div>
    )
}

export default Bloglist
