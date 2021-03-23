// Should be used to capture simple things; Get it to work with React JS
// Get this piece working first
// Use this form as a landing spot for the first incarnation of Mockingbird
// Form first, then store the voice, then have a separate onClick/Submit event for the voice

import React, { useCallback, useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { VoiceContext } from "./VoiceProvider.js"
import { CategoryContext } from "../category/CategoryProvider.js"

// Want to import User, Auth components here.
// import { ProfileProvider } from './auth/AuthProvider.js'


export const VoiceForm = (props) => {
    const { voices, addVoice, updateVoice, getVoices, deleteVoice } = useContext(VoiceContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { transcript, resetTranscript } = useSpeechRecognition()
    
    // Component state
    // Sets the state of the empty values for a Voice
    const [voice, setVoice] = useState(
        {
            categoryId: "0"
        }
        )
        
    // Something of a URL parameter
    const editMode = props.match.params.hasOwnProperty("voiceId")
        
    // Object.assign creates a copy; e.target.value modifies a copy
    const handleControlledInputChange = (e) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newVoice = Object.assign({}, voice)
        newVoice[e.target.name] = e.target.value
        setVoice(newVoice)
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an event.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the animal.
            3. Update component state variable.
    */

    useEffect(() => {
        getVoices()
        getTypes()
    }, [transcript])

    console.log(`${transcript}`)

    const getVoiceInEditMode = () => {
        if (editMode) {
            const voiceId = +(props.match.params.voiceId)
            const selectedVoice = voices.find(v => v.id === voiceId) || {}
            setVoice(selectedVoice)
        }
    }


    // If browser doesn't support speech recognition, return null
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    // Function that passes the start-recording onClick to enable continuous recording.
    const startListening = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }

    useEffect(() => {
        getVoiceInEditMode()
    }, [voices])


    const constructNewVoice = () => {
        const categoryId = +(voice.categoryId)

        if (categoryId === 0) {
            window.alert("Please select a category.")
        } else {
            if (editMode) {
                updateVoice({
                    voice_name: voice.voice_name,
                    date_created: voice.date_created,
                    categoryId: categoryId,
                    voice_text: voice.voice_text,
                    voice_edited: voice.voice_edited
                })
                    .then(() => props.history.push("/voices"))
            } else {
                addVoice({
                    voice_name: voice.voice_name,
                    date_created: voice.date_created,
                    creator: +(localStorage.getItem("birdie")),
                    categoryId: categoryId,
                    voice_text: voice.voice_text,
                    voice_edited: voice.voice_edited
                })
                .then(() => props.history.push("/voices"))
            }
            }
        }
    
return (

    <div className="container">
        <div>
            {transcript.charAt(0).toUpperCase() + transcript.slice(1)}
        </div>

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
                
            </div>
        </fieldset>

    </div>

)
}