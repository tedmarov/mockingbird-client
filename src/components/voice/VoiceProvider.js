import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const VoiceContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const VoiceProvider = (props) => {
    const [voices, setVoices] = useState([])

    const getVoices = () => {
        return fetch("http://localhost:8088/voices")
            .then(res => res.json())
            .then(setVoices)
    }

    const addVoice = voice => {
        return fetch("http://localhost:8088/voices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(voice)
        })
            .then(getVoices)
    }

    const updateVoice = voice => {
        return fetch(`http://localhost:8088/voices/${voice.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(voice)
        })
            .then(getVoices)
    }

    const deleteVoice = voiceId => {
        return fetch(`http://localhost:8088/dVoices/${voiceId}`, {
            method: "DELETE",
        })
            .then(getVoices)
    }

    /*
        You return a context provider which has the
        `dVoices` state, the `adddVoice` function,
        and the `getdVoice` function as keys. This
        allows any child elements to access them.
    */
    return (
        <VoiceContext.Provider value={{
            voices, addVoice, getVoices, updateVoice, deleteVoice
        }}>
            {props.children}
        </VoiceContext.Provider>
    )
}