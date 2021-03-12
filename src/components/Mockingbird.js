import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews.js"
import { NavBar } from "./navbar/NavBar.js"
// import { Login } from "./auth/Login.js"
// import { Register } from "./auth/Register.js"
// import { ProfileProvider } from './auth/AuthProvider.js'
import "./Mockingbird.css"

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


export const Mockingbird = (props) => {
    const { transcript, resetTranscript }    = useSpeechRecognition()

    const titleDialog = React.createRef()

    // Sets the state of the empty values for a Voice
    const [voice, setVoice] = useState({})

    // If browser doesn't support speech recognition, return null
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    // Function that passes the start-recording onClick to enable continuous recording.
    const beginVoiceRecording = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }


    // Object.assign creates a copy; e.target.value modifies a copy
    const handleControlledInputChange = (e) => {
        const newVoice = Object.assign({}, voice)
        newVoice[e.target.name] = e.target.value
        SpeechSynthesisVoice(newVoice)
    }

    

}