import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./mockingbird_logo.jpg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Dashboard</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to={{pathname: "/voices"}}>All Voices</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Categories</Link>
            </li>
            {/* {
                (localStorage.getItem("admin") === "true")
                ?   <li className="navbar__item">
                        <Link className="navbar__link" to="/users">Users</Link>
                    </li>
                :<></>
            } */}
            {
                (localStorage.getItem("birdie") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("birdie")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}