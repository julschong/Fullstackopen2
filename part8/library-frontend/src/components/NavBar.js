import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import _ from 'lodash'

const NavBar = ({ userinfo }) => {
    return (
        <div className="nav-container">
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
            <NavLink className="nav-link" to="recommendation">
                Recommend
            </NavLink>
            <NavLink className="nav-link" to="login">
                {_.isEmpty(userinfo) ? 'Login' : 'Logout'}
            </NavLink>
        </div>
    )
}

export default NavBar
