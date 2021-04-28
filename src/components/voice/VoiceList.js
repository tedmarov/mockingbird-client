import React, { useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import { VoiceContext } from "./VoiceProvider.js"
import "./Voice.css"

export const VoiceList = (props) => {
    // This state changes when `getVoices()` is invoked below
    const { voices, getVoices } = useContext(VoiceContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders. The empty bracket is
        the Dependency Array. It only runs the first time the component renders.
    */
    useEffect(() => {
        console.log("VoiceList: Initial render before data")
        getVoices()
    }, [])
    
    console.log(voices)

    const birdieId = localStorage.getItem("birdie")


    const privateMode = voices.voice_privacy

    console.log({privateMode})

    const verifyCreatorPrivacy = (birdieId, privateMode) => {
        if (birdieId === voices.creator_id || privateMode === true)
        return Boolean(false);
    }

    return (
        <article className="voicesWindow">

            {
                // Iterate the array of voices with .map()
                voices.map(voice => {
                    return (<div className="voiceCard" key={voice.id}>
                        {verifyCreatorPrivacy(birdieId, voice.privacy) ?  "" : < Link
                            to={{
                                pathname: `/voices/${voice.id}`
                            }} >
                            <h3>{voice.name}</h3>
                        </Link> }
                    </div>
                    )
                })}
                <button onClick={() => props.history.push("/voices/create")}>
                    Create a Voice
                </button>
        </article>
    )
}