import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
// import { ApplicationViews } from "./ApplicationViews.js"
// import { NavBar } from "./navbar/NavBar.js"
// import { Login } from "./auth/Login.js"
// import { Register } from "./auth/Register.js"
// import { ProfileProvider } from './auth/AuthProvider.js'
import "./Mockingbird.css"

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Mockingbird = () => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    
    useEffect(() => {
        console.log(transcript)
    }, [transcript])

    // Sets the state of the empty values for a Voice
    const [voice, setVoice] = useState({})

    // If browser doesn't support speech recognition, return null
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    // Function that passes the start-recording onClick to enable continuous recording.
    const startListening = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }


    // Object.assign creates a copy; e.target.value modifies a copy
    const handleControlledInputChange = (e) => {
        const newVoice = Object.assign({}, voice)
        newVoice[e.target.name] = e.target.value
        setVoice(newVoice)
    }

return (
    <div className="voiceContainer">

        <fieldset>
            <div className="d-flex justify-content-center speech-recog">
                <button className="start-recording" onClick={startListening}>
                    Start Recording
                </button>

                <button className="stop-recording" onClick={SpeechRecognition.stopListening}>
                    Stop Recording
                </button>

                <button className="reset-recording" onClick={resetTranscript} >
                    Reset Recording
                </button>
            </div>
        </fieldset>    
        <fieldset>
            <div className="form-group">
                <label htmlFor="birdie_voice">Birdie Voice: </label>
                {/* {transcript} */}
            </div>
        </fieldset>

    </div>

)
}