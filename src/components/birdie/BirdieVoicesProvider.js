import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const BirdieVoicesContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const BirdieVoicesProvider = (props) => {
    const [birdieVoices, setBirdieVoices] = useState([])
    const [birdieVoicesExpanded, setBirdieVoicesExpanded] = useState([])

    const getBirdieVoices = () => {
        return fetch("http://localhost:8000/birdieVoices")
            .then(res => res.json())
            .then(setBirdieVoices)
    }

    const addBirdieVoice = (birdieId, voiceId) => {
        return fetch("http://localhost:8088/birdieVoices", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                birdieId,
                voiceId
            })
        })
            .then(_ => _.json())
            .then(getBirdieVoices)
    }

    const getBirdieVoicesExpanded = () => {
        return fetch(`http://localhost:8088/birdieVoices?_expand=birdie&_expand=voice`)
            .then(res => res.json())
            .then(setBirdieVoicesExpanded)
    }

    /*
        You return a context provider which has the
        `Birdies` state, the `addBirdie` function,
        and the `getBirdieVoice` function as keys. This
        allows any child elements to access them.
    */
    return (
        <BirdieVoicesContext.Provider value={{
            birdieVoices, getBirdieVoices, addBirdieVoice, birdieVoicesExpanded, getBirdieVoicesExpanded
        }}>
            {props.children}
        </BirdieVoicesContext.Provider>
    )
}