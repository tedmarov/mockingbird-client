import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar.js"
import { Login } from "./auth/Login.js"
import { Register } from "./auth/Register.js"

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

        <Route path="/login" render={Login}/>
        <Route path="/register" render={Register}/>
    </>
)