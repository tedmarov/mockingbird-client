import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { VoiceContext } from "./VoiceProvider.js"
import { CategoryContext } from "../category/CategoryProvider.js"
import { TextContext } from "../text/TextProvider.js"
import { faMicrophoneAlt, faRedo, faStopCircle } from "@fortawesome/free-solid-svg-icons"

export const VoiceForm = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    const { categories, getCategories } = useContext(CategoryContext)
    const { texts, getTexts } = useContext(TextContext)
    const { voices, addVoice, getVoices, getSingleVoice, updateVoice, deleteVoice } = useContext(VoiceContext)
    
    const [voice, setVoice] = useState({})
    const [name, setName] = useState()
    const [recording, setRecording] = useState()
    const [created, setCreated] = useState()
    const [category, setCategory] = useState()
    const [text, setText] = useState()

    console.log(categories)
    console.log(texts)

    const titleDialog = React.createRef()
    
    useEffect(() => {
        getCategories()
        getTexts()
        getVoices()
    }, [])
    
    useEffect(() => {
        getVoiceInEditMode()
    }, [])
    
    const [currentVoice, setCurrentVoice] = useState(
        {
            name: "",
            recording: "",
            edited: false,
            privacy: false,
            created: "",
            category_id: 0,
            text_id: 0
        })

    useEffect(() => {
        if (props.match.params.voice_id) {
            getSingleVoice(props.match.params.voice_id).then(voice => {
                setCurrentVoice({
                    name: voice.name,
                    recording: voice.recording,
                    edited: voice.edited,
                    privacy: voice.privacy,
                    created: voice.created,
                    category_id: voice.category_id,
                    text_id: voice.text_id
                })
            })
        }
    }, [props.match.params.voice_id])

        
    // Something of a URL parameter
    const editMode = props.match.params.hasOwnProperty("voice_id")
    
    // Object.assign creates a copy; e.target.value modifies a copy
    const handleControlledInputChange = (event) => {
        const newVoice = Object.assign({}, currentVoice)
            newVoice[event.target.name] = event.target.value
            setCurrentVoice(newVoice)
    }        

    /*
        If there is a URL parameter, then the birdie has chosen to
        edit a voice.
        1. Get the value of the URL parameter.
        2. Use that `id` to find the voice.
        3. Update component state variable.
    */
    
    const getVoiceInEditMode = () => {
        if (editMode) {
            console.log(editMode)
            const voice_id = parseInt(props.match.params.voice_id)
            const selectedVoice = voices.find(v => v.id === voice_id)
            setCurrentVoice(selectedVoice)
        }
    }
        
    const handleCheckedInputChange = (e) => {
        const changedPrivacy = Object.assign({}, currentVoice)
        changedPrivacy[e.target.name] = Boolean(e.target.checked)
        setCurrentVoice(changedPrivacy)
    }

    // If browser doesn't support speech recognition, return null
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }
    
    // Function that passes the start-recording onClick to enable continuous recording.
    const startListening = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }

    // console.log({categories})

    const constructNewVoice = () => {
        const category_id = parseInt(voice.category_id)
        const text_id = parseInt(voice.text_id)
        if ( category_id === 0 ) {
            window.alert("Please select a category.") }
        else if ( text_id === 0 ) { 
            window.alert("Please select a text.") }
        else {
            if (editMode) {
                const newVoice={
                    id: props.match.params.voice_id,
                    name: currentVoice.name,
                    recording: currentVoice.recording,
                    edited: true,
                    privacy: currentVoice.privacy,
                    created: voice.created,
                    category_id: currentVoice.category_id || currentVoice.category.id,
                    text_id: currentVoice.text_id || currentVoice.text.id
                }
                updateVoice(newVoice).then(props.history.push("/"))
            } else if (voice.name) {
                const newVoice={
                    name: currentVoice.name,
                    recording: transcript.charAt(0).toUpperCase() + transcript.slice(1),
                    edited: false,
                    privacy: currentVoice.privacy,
                    created: currentVoice.created,
                    category_id: currentVoice.category_id,
                    text_id: currentVoice.text_id
                }
                addVoice(newVoice).then(props.history.push("/"))
                }
            else
                titleDialog.current.showModal()
    }
    
    return (
        <>
        <main className="container--main">
            <dialog className="dialog dialog--password" ref={titleDialog}>
                <div>Please enter a voice name.</div>
                <button className="button--close" onClick={e => titleDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <fieldset>
                    <h2>{editMode ? "Update Voice" : "New Voice"}</h2>
                </fieldset>
            {/* Begin Speech Re cognition Section */}
                <div className="d-flex justify-content-center speech-recog">
                    <FontAwesomeIcon className="start-recording" onClick={startListening} icon={faMicrophoneAlt} />
                    <FontAwesomeIcon className="stop-recording" onClick={SpeechRecognition.stopListening} icon={faStopCircle} />
                    <FontAwesomeIcon className="reset-recording" onClick={resetTranscript} icon={faRedo} />
                </div>
            {/* End Speech Recogntion Section */}
                <form className="form--main">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="voice_recording">Recording: </label>
                            <textarea disabled type="text" name="voice_recording" rows="15" required autoFocus className="form-control"
                                placeholder="Ready to record? Click the microphone icon. Want to stop? Click the black stop button. Need to start from scratch? Click the circle arrow to reset the transcript."
                                defaultValue={voice.voice_recording || transcript.charAt(0).toUpperCase() + transcript.slice(1)}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="voice_name">Voice Name: </label>
                        <input type="text" name="voice_name"
                            required autoFocus
                            className="form-control"
                            placeholder="Voice Name"
                            defaultValue={voice.voice_name}
                            onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="date_created">Voice Date: </label>
                        <input type="date" name="date_created"
                            required autoFocus
                            className="form-control"
                            placeholder="Date Voice Created"
                            defaultValue={voice.date_created}
                            onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="category_id"> Select Category </label>
                        <select name="category_id" className="form-control"
                            proptype="int"
                            defaultValue={voice.category_id}
                            onChange={handleControlledInputChange}>
                            <option>Select Category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id} >
                                    {c.category_label}  
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="text_id"> Text Title </label>
                        <select name="text_id" className="form-control"
                            proptype="int"
                            defaultValue={voice.text_id}
                            onChange={handleControlledInputChange}>
                            <option> Select Text</option>
                            {texts.map(t => (
                                <option key={t.id} value={t.id} >
                                    {t.text_title}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <div>                
                        <label>
                            <input type="checkbox" id="private-checkbox" defaultValue={voice.voice_privacy} onChange={handleCheckedInputChange}></input>
                                Please select if you would like privacy for your voice.
                        </label>
                    </div>
                    </fieldset>
                </form>
                <div className="text-center">
                        <button type="submit"
                            onClick={evt => {
                                evt.preventDefault() // Prevent browser from submitting the form
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
        </>
    )
    }
}