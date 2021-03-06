import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Mockingbird } from "./components/Mockingbird.js"
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        {/* I will be placing Routes in my Mockingbird component. */}
        <Router>
            <Mockingbird />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
