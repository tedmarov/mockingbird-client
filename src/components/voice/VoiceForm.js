// Should be used to capture simple things; Get it to work with React JS
// Get this piece working first
// Use this form as a landing spot for the first incarnation of Mockingbird
// Form first, then store the voice, then have a separate onClick/Submit Voice for the voice

import React, { useCallback, useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { VoiceContext } from "./VoiceProvider.js"
import { CategoryContext } from "../category/CategoryProvider.js"

// Want to import User, Auth components here.
// import { ProfileProvider } from './auth/AuthProvider.js'


export const VoiceForm = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    const { categories, getCategories } = useContext(CategoryContext)
    const { voices, addVoice, getVoices, updateVoice, deleteVoice } = useContext(VoiceContext)
    
    const titleDialog = React.createRef()
    
    useEffect(() => {
        getVoices()
        getTypes()
    }, [])
    
    useEffect(() => {
        getVoiceInEditMode()
    }, [voices])
    
    // Component state
    // Sets the state of the empty values for a Voice
    const [voice, setVoice] = useState({
        categoryId: "0"
    })
    
    // If browser doesn't support speech recognition, return null
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }
    
    // Function that passes the start-recording onClick to enable continuous recording.
    const startListening = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }
    
    // Something of a URL parameter
    const editMode = props.match.params.hasOwnProperty("voiceId")
    
    /*
        If there is a URL parameter, then the birdie has chosen to
        edit a voice.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the voice.
            3. Update component state variable.
    */
    const getVoiceInEditMode = () => {
        if (editMode) {
            const voiceId = +(props.match.params.voiceId)
            const selectedVoice = voices.find(v => v.id === voiceId) || {}
            setVoice(selectedVoice)
        }
    }   

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

    // console.log(`${transcript}`)

    const constructNewVoice = () => {
        const categoryId = +(voice.categoryId)

        if (categoryId === 0) {
            window.alert("Please select a category.")
        } else {
            if (editMode) {
                updateVoice({
                    voice_name: voice.voice_name,
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

    <main className="container--main">
        <section>
            <form className="form--main">
                <fieldset>
                    <h2>{editMode ? "Update Voice" : "New Voice"}</h2>
                </fieldset>
                <fieldset>
                    <label htmlFor="categoryId"> Select Game Type </label>
                    <select name="categoryId" className="form-control"
                        prototype="int"
                        required
                        value={voice.categoryId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select type</option>
                        {types.map(t => (
                            <option key={t.id} value={t.id} >
                                {t.category}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="gameId"> Select Game </label>
                    <select name="gameId"
                        className="form-control"
                        prototype="int"
                        required
                        value={Voice.gameId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select game</option>
                        {games.map(g => (
                            <option key={g.id} value={g.id} >
                                {g.title}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="VoiceName">Voice name: </label>
                    <input type="text" name="VoiceName"
                        required autoFocus
                        className="form-control"
                        placeholder="Voice name"
                        value={Voice.VoiceName}
                        onChange={handleControlledInputChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="VoiceLoc">Voice location: </label>
                    <input type="text" name="VoiceLoc"
                        required autoFocus
                        className="form-control"
                        placeholder="Location name"
                        value={Voice.VoiceLoc}
                        onChange={handleControlledInputChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="VoiceDateAndTime">Voice Date and Time: </label>
                    <input type="text" name="VoiceDateAndTime"
                        required autoFocus
                        className="form-control"
                        placeholder="Voice date and time"
                        value={Voice.VoiceDateAndTime}
                        onChange={handleControlledInputChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="details"> Short Description </label>
                    <textarea type="text" rows="3" cols="20"
                        name="details"
                        placeholder="Enter description"
                        value={Voice.details}
                        required onChange={handleControlledInputChange} />
                </fieldset>
            </form>
            <fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.prVoiceDefault() // PrVoice browser from submitting the form
                        constructNewVoice()
                    }}>
                    {editMode ? "Update Voice" : "Create Voice"}
                </button>
            </fieldset>
            {editMode && <fieldset>
                <button
                    onClick={() => {
                        deleteVoice(Voice.id)
                            .then(() => {
                                props.history.push("/Voices")
                            })
                    }}>Delete Voice</button>
            </fieldset>}
        </section>
    </main>
    
    )
}

// <div className="container">
//     <div>
//         {transcript.charAt(0).toUpperCase() + transcript.slice(1)}
//     </div>

//     <fieldset>
//         <div className="d-flex justify-content-center speech-recog">
//             <button className="start-recording" onClick={startListening}>
//                 Start Recording
//             </button>

//             <button className="stop-recording" onClick={SpeechRecognition.stopListening}>
//                 Stop Recording
//             </button>

//             <button className="reset-recording" onClick={resetTranscript} >
//                 Reset Recording
//             </button>
//         </div>
//     </fieldset>    
//     <fieldset>
//         <div className="form-group">
//             <label htmlFor="birdie_voice">Birdie Voice: </label>
            
//         </div>
//     </fieldset>

// </div>