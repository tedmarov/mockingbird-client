import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./mockingbird_logo.jpg"

export const NavBar = (props) => {

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        props.history.push("/login")
    }

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Dashboard</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to= "/voices">All Voices</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">All Categories</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/texts">All Texts</Link>
            </li>
            <li className="navbar__item" >
                <Link className="navbar__link" onClick={(e) => { if (window.confirm('Are you sure you wish to log out?')) { handleLogout(e) } }}>Logout</Link>
            </li> 
        </ul>
    )
}