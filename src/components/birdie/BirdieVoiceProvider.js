import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const BirdieVoiceContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const BirdieProvider = (props) => {
    const [birdieVoices, setBirdieVoices] = useState([])

    const getBirdieVoices = () => {
        return fetch("http://localhost:8000/birdieVoices")
            .then(res => res.json())
            .then(setBirdieVoices)
    }

    /*
        You return a context provider which has the
        `Birdies` state, the `addBirdie` function,
        and the `getBirdieVoice` function as keys. This
        allows any child elements to access them.
    */
    return (
        <BirdieVoiceContext.Provider value={{
            birdieVoices, getBirdieVoices
        }}>
            {props.children}
        </BirdieVoiceContext.Provider>
    )
}