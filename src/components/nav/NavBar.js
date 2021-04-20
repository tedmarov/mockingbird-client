import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./mockingbird_logo.jpg"

export const NavBar = (props) => {
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
            {
                (localStorage.getItem("birdie") !== null) ?
                    <li className="navbar__item" >
                        <Link className="navbar__link" onClick={() => { if (window.confirm('Are you sure you wish to log out?')) { localStorage.removeItem("birdie")
                        props.history.push({ pathname: "/"}) } }}>
                            Logout
                        </Link>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/register">
                                Register
                            </Link>
                        </li>
                    </>
            }
        </ul>
    )
}