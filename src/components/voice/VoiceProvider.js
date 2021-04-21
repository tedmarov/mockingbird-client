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
                "Authorization": `Token ${localStorage.getItem("birdie")}`
            }
        })
        .then(r => r.json())
        .then(setVoices)
    }

    const getSingleVoice = id => {
        return fetch(`http://localhost:8000/voices/${id}`,{
            headers: {
                "Authorization": `Token ${localStorage.getItem("birdie")}`
            }
        })
            .then(res => res.json())
    }

    const getVoicesByUser = (user_id) => {
        return fetch(`http://localhost:8000/voices?user_id=${user_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("birdie")}`
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

    const updateVoice = updatedVoice => {
        return fetch(`http://localhost:8000/voices/${updatedVoice.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("birdie")}`
            },
            body: JSON.stringify(updatedVoice)
        })
            .then(getVoices)
    }

    const deleteVoice = id => {
        return fetch(`http://localhost:8000/voices/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("birdie")}`
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