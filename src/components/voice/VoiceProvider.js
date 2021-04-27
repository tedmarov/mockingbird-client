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
    const [singleVoice, setSingleVoice] = useState([])
    const [myVoices, setMyVoices] = useState([])

    const birdie = localStorage.getItem("birdie")

    const getVoices = () => {
        return fetch("http://localhost:8000/voices", {
            headers: {
                "Authorization": `Token ${birdie}`
            }
        })
        .then(r => r.json())
        .then(setVoices)
    }

    const getSingleVoice = (voiceId) => {
        return fetch(`http://localhost:8000/voices/${voiceId}`,{
            headers: {
                "Authorization": `Token ${birdie}`
            }
        })
            .then(res => res.json())
    }

    const getVoicesByUser = (user_id) => {
        return fetch(`http://localhost:8000/voices?user_id=${user_id}`, {
            headers: {
                "Authorization": `Token ${birdie}`
            }
        })
        .then(res => res.json())
    }

    const addVoice = newVoice => {
        return fetch("http://localhost:8000/voices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("birdie")}`
            },
            body: JSON.stringify(newVoice)
        })
            .then(newVoice)
    }

    const updateVoice = voice => {
        return fetch(`http://localhost:8000/voices/${voice.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${birdie}`
            },
            body: JSON.stringify(voice)
        })
            .then(getVoices)
    }

    const deleteVoice = voiceId => {
        return fetch(`http://localhost:8000/voices/${voiceId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${birdie}`
            }
        })
        .then(getVoices)
    }

    /*
        You return a context provider which has the
        `Voices` state, the `adddVoice` function,
        and the `getdVoice` function as keys. This
        allows any child elements to access them.
    */
    return (
        <VoiceContext.Provider value={{
            voices, addVoice, getVoices, getSingleVoice, getVoicesByUser, updateVoice, deleteVoice
        }}>
            {props.children}
        </VoiceContext.Provider>
    )
}