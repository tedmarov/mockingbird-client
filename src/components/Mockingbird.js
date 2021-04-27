import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar.js"
import { Login } from "./auth/Login.js"
import { Register } from "./auth/Register.js"
import "./Mockingbird.css"

// Need a login screen/register screen CS

export const Mockingbird = () => (
    <>

        <Route render={() => {
            if (localStorage.getItem("birdie")) {
                return <>
                        <Route render={NavBar} />
                        <Route render={props => <ApplicationViews {...props} /> } />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={(props) => {
            if (localStorage.getItem("birdie")) {
                return <Redirect to="/" />
            } else {
                return <Login {...props} />
            }
        }} />

        <Route path="/register" render={(props) => {
            if (localStorage.getItem("birdie")) {
                return <Redirect to="/" />
            } else {
                return <Register history={props.history} />
            }
        }} />
    </>
)