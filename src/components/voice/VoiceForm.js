import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophoneAlt, faRedo, faStopCircle } from "@fortawesome/free-solid-svg-icons"
import { CategoryContext } from "../category/CategoryProvider.js"
import { TextContext } from "../text/TextProvider.js"
import { VoiceContext } from "./VoiceProvider.js"

export const VoiceForm = (props) => {
    const history = useHistory()
    const { transcript, resetTranscript } = useSpeechRecognition()
    const { categories, getCategories } = useContext(CategoryContext)
    const { text, getTexts } = useContext(TextContext)
    const { voices, addVoice, getVoices, updateVoice, deleteVoice } = useContext(VoiceContext)
    
    console.log(categories)
    console.log(text)
    
    // Component state
    // Sets the state of the empty values for a Voice
    // const [checked, setChecked] = useState(false)
    // const [voice_name, setVoiceName] = useState()
    // const [voice_recording, setVoiceRecording] = useState()
    // const [category, setCategory] = useState()
        
    const [voice, setVoice] = useState(
        {
            voice_name: "",
            voice_recording: "",
            voice_edited: false,
            voice_privacy: false,
            date_created: "",
            category_id: 0,
            text_id: 0
        })
        
            const titleDialog = React.createRef()
            
    useEffect(() => {
        getCategories()
        getTexts()
        getVoices()
    }, [])
    
    useEffect(() => {
        getVoiceInEditMode()
    }, [voices])
        
    // Something of a URL parameter
    const editMode = props.match.params.hasOwnProperty("voiceId")
    
    // Object.assign creates a copy; e.target.value modifies a copy
    const handleControlledInputChange = (event) => {
        /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
        */
       const newVoice = Object.assign({}, voice)
       newVoice[event.target.name] = event.target.value
       setVoice(newVoice)
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
            const voice_id = +(props.match.params.voice_id)
            const selectedVoice = voices.find(v => v.id == voice_id) || {}
            setVoice(selectedVoice)
        }
    }

    const handleCheckedInputChange = (e) => {
        const changedPrivacy = Object.assign({}, voice)
        changedPrivacy[e.target.name] = Boolean(e.target.checked)
        setVoice(changedPrivacy)
    }

    // useEffect(() => {
    //     if (props.match.params.voice_id) {
    //         getVoiceById(props.match.params.voice_id).then(voice => {
    //             setVoice({
    //                 voice_name: voice.voice_name,
    //                 date_created: voice.date_created,
    //                 voice_recording: voice.voice_recording,
    //                 voice_edited: false,
    //                 voice_privacy: false,
    //                 category_id: 0,
    //                 text_id: 0
    //             })
    //         })
    //     }
    // }, [props.match.params.voice_id])

    // If browser doesn't support speech recognition, return null
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }
    
    // Function that passes the start-recording onClick to enable continuous recording.
    const startListening = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }

    // // changes the value of the checkbox
    // const checkboxHandler = () => {
    //     setChecked(!checked)
    //     }

    // console.log({categories})

    const constructNewVoice = () => {
        const category_id = parseInt(voice.category_id)
        const text_id = parseInt(voice.text_id)
        if ( category_id == 0 ) {
            window.alert("Please select a category.") }
        else if ( text_id == 0 ) { 
            window.alert("Please select a text.") }
        else {
            if (editMode) {
                updateVoice({
                    id: voice.id,
                    voice_name: voice.voice_name,
                    voice_recording: voice.voice_recording,
                    voice_edited: voice.voice_edited,
                    voice_privacy: voice.voice_privacy,
                    category_id: voice.category_id,
                    text_id: voice.text_id
                })
                    .then(() => props.history.push("/voices"))
            } else if (voice.voice_name) {
                addVoice({
                    voice_name: voice.voice_name,
                    date_created: voice.date_created,
                    voice_recording: transcript.charAt(0).toUpperCase() + transcript.slice(1),
                    voice_edited: voice.voice_edited,
                    voice_privacy: voice.voice_privacy,
                    category_id: category_id,
                    text_id: text_id
                })
                .then(() => props.history.push("/voices"))
            } else {
                titleDialog.current.showModal()
            }
        }}
    
return (

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
                        <option defaultValue="0">Select Category</option>
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
                        <option defaultValue="0"> Select Text</option>
                        {text.map(t => (
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
    
    )

}
