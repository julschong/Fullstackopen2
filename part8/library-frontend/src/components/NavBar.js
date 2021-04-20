import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    return (
        <div class="nav-container">
            <NavLink className="nav-link" exact to="/">
                Home
            </NavLink>
            <NavLink className="nav-link" to="authors">
                Authors
            </NavLink>
            <NavLink className="nav-link" to="books">
                Books
            </NavLink>
            <NavLink className="nav-link" to="add">
                Add Book
            </NavLink>
            <NavLink className="nav-link" to="login">
                Login
            </NavLink>
        </div>
    )
}

export default NavBar
