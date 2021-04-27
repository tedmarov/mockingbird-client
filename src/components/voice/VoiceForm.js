// Should be used to capture simple things; Get it to work with React JS
// Get this piece working first
// Use this form as a landing spot for the first incarnation of Mockingbird
// Form first, then store the voice, then have a separate onClick/Submit Voice for the voice

import React, { useContext, useEffect, useState } from "react"
import { faMicrophoneAlt, faRedo, faStopCircle } from "@fortawesome/free-solid-svg-icons"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { VoiceContext } from "./VoiceProvider.js"
import { CategoryContext } from "../category/CategoryProvider.js"
import { TextContext } from "../text/TextProvider.js"

// Want to import User, Auth components here.
// import { ProfileProvider } from './auth/AuthProvider.js'

export const VoiceForm = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    const { categories, getCategories } = useContext(CategoryContext)
    const { texts, getTexts } = useContext(TextContext)
    const { voices, addVoice, getVoices, getVoiceById, updateVoice, deleteVoice } = useContext(VoiceContext)
    
    const titleDialog = React.createRef()
    
    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        getCategories()
        getTexts()
        getVoices()
    }, [])
    
    useEffect(() => {
        getVoiceInEditMode()
    }, [])
    
    // Component state
    // Sets the state of the empty values for a Voice
    const [voice, setVoice] = useState({})
    const [checked, setChecked] = useState(false)
    
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
    
    /*    If there is a URL parameter, then the birdie has chosen to
    edit a voice.
    1. Get the value of the URL parameter.
    2. Use that `id` to find the voice.
    3. Update component state variable.    */
    const getVoiceInEditMode = () => {
        if (editMode) {
            const voiceId=parseInt(props.match.params.voiceId)
            const selectedVoice=voices.find(v => v.id === voiceId) || {}
            setVoice(selectedVoice)
            setChecked(selectedVoice.privacy)
        }
    }   
        
    /* 
        Object.assign creates a copy; e.target.value modifies a copy.
        When changing a state object or array, always create a new one
        and change state instead of modifying current one. 
        When a field changes, update the state.
    */    
    const handleControlledInputChange = (e) => {
        const newVoice = Object.assign({}, voice)
        newVoice[e.target.name] = e.target.value
        setVoice(newVoice)
    }
    
    // Changes the value of the checkbox
    const checkboxHandler = () => {
        setChecked(!checked)
    }

    /* 
        Check if the IDs are 0/Not selected. If they are, give a window pop-up asking the user to select an item for both.
        Or else if there are chosen IDs for Category and Text, proceed on to updating or creating an object.
        If there is a URL paramater, retrieve data from existing object.
        Or else if there is at least a name entered into the voice object, add the object.
        Otherwise give them a dialog pop-up box.
    */
    const constructNewVoice = () => {
        if ( voice.category_id === 0 || voice.text_id === 0 ) {
            window.alert("Please select a category.")
        } else {
            if (editMode){
                updateVoice({
                    id: voice.id,
                    name: voice.name,
                    recording: voice.recording,
                    edited: true,
                    privacy: checked,
                    create_date: voice.create_date,
                    category_id: parseInt(voice.category_id),
                    text_id: parseInt(voice.text_id)
                })
                    .then(() => props.history.push("/voices"))
            } else if (voice.name) {
                addVoice({
                    name: voice.name,
                    recording: transcript.charAt(0).toUpperCase() + transcript.slice(1),
                    edited: false,
                    privacy: checked,
                    create_date: voice.create_date,
                    category_id: parseInt(voice.category_id),
                    text_id: parseInt(voice.text_id)
                })
                    .then(() => props.history.push("/voices"))
            } else {
                titleDialog.current.showModal()
            }
        }}
        
    return (
        <main className="container--main">
            <section>
            <dialog className="dialog dialog--password" ref={titleDialog}>
                {/* This pops up if there is no voice name entered. */}
                <div>Please enter a voice name.</div>
                <button className="button--close" onClick={e => titleDialog.current.close()}>Close</button>
            </dialog>
                <fieldset>
                    {/* This renders depending on if the voice object already exists or needs to be created. */}
                    <h2>{editMode ? "Update Voice" : "New Voice"}</h2>
                </fieldset>
                <form className="form--main">
                    <fieldset>
                        <label htmlFor="name">Voice Name: </label>
                        <input type="text" name="name" className="form-control" placeholder="Voice Name" defaultValue={voice.name} onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="recording">Recording: </label>
                            <textarea type="text" name="recording" rows="15" className="form-control"
                                placeholder="Ready to record? Click the microphone icon. Want to stop? Click the black stop button. Need to start from scratch? Click the circle arrow to reset the transcript."
                                defaultValue={voice.recording || transcript.charAt(0).toUpperCase() + transcript.slice(1)}
                                onChange={handleControlledInputChange}
                                />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="d-flex justify-content-center speech-recog">
                            <FontAwesomeIcon className="start-recording" onClick={startListening} icon={faMicrophoneAlt} />
                            <FontAwesomeIcon className="stop-recording" onClick={SpeechRecognition.stopListening} icon={faStopCircle} />
                            <FontAwesomeIcon className="reset-recording" onClick={resetTranscript} icon={faRedo} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="create_date">Voice Date: </label>
                        <input type="date" name="create_date" className="form-control" placeholder="Date Voice Created" defaultValue={voice.create_date} onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="category_id"> Voice Category </label>
                        <select name="category_id" className="form-control" defaultValue={voice.category_id} onChange={handleControlledInputChange}>
                            <option>Select Category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id} >
                                    {c.label}  
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="text_id"> Voice Text </label>
                        <select name="text_id" className="form-control" defaultValue={voice.text_id} onChange={handleControlledInputChange}>
                            <option> Select Text</option>
                            {texts.map(t => (
                                <option key={t.id} value={t.id} >
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <div>                
                        <label>
                            {/* Just a basic checkbox with a boolean value that can be private or public. */}
                            <input type="checkbox" id="private-checkbox" value={checked} checked={checked} onChange={checkboxHandler}></input>
                                Please select if you would like privacy for your voice.
                        </label>
                    </div>
                    </fieldset>
                </form>
                <div className="text-center">
                        <button type="submit"
                            onClick={event => {
                                event.preventDefault() // Prevent browser from submitting the form empty
                                console.log(voice)
                                constructNewVoice()
                            }}>
                            {editMode ? "Update Voice" : "Create Voice"}
                        </button>
                    {editMode &&
                        <button
                        onClick={() => {
                            deleteVoice(voice.id)
                            .then(() => {
                                props.history.push("/voices")
                            })
                        }}>Delete Voice</button>
                    }
                </div>
            </section>
        </main>
    
    )
    
}
