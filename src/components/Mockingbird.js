import React from "react"
import { Route, Redirect } from "react-router-dom"
// import { ApplicationViews } from "./ApplicationViews.js"
// import { NavBar } from "./navbar/NavBar.js"
// import { Login } from "./auth/Login.js"
// import { Register } from "./auth/Register.js"
// import { ProfileProvider } from './auth/AuthProvider.js'
import "./Mockingbird.css"

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Mockingbird = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()

    // Sets the state of the empty values for a Voice
    const [voice, setVoice] = useState({})

    // If browser doesn't support speech recognition, return null
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    // Function that passes the start-recording onClick to enable continuous recording.
    const beginVoiceRecording = () => {
        return SpeechRecognition.beginVoiceRecording({ continuous: true })
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
                <FontAwesomeIcon className="start-recording" onClick={beginVoiceRecording} icon={faMicrophoneAlt} />
                <FontAwesomeIcon className="stop-recording" onClick={SpeechRecognition.stopListening} icon={faStopCircle} />
                <FontAwesomeIcon className="reset-recording" onClick={resetTranscript} icon={faRedo} />
            </div>
        </fieldset>    
        <fieldset>
            <div className="form-group">
                <label htmlFor="birdie_voice">Birdie Voice: </label>
                <textarea type="text" name="birdie_voice" rows="15" required autoFocus className="form-control"
                    placeholder="Click the red microphone to start recording, click the black stop button to end recording, and the circle arrow to reset the transcript."
                    defaultValue={voice.birdie_voice || transcript.charAt(0).toUpperCase() + transcript.slice(1)}
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>


    </div>
    console.log(voice)
)
}