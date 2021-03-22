import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const BirdieContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const BirdieProvider = (props) => {
    const [birdies, setBirdies] = useState([])

    const getBirdies = () => {
        return fetch("http://localhost:8000/birdies")
            .then(res => res.json())
            .then(setBirdies)
    }

    /*
        You return a context provider which has the
        `Birdies` state, the `addBirdie` function,
        and the `getBirdie` function as keys. This
        allows any child elements to access them.
    */
    return (
        <BirdieContext.Provider value={{
            birdies, getBirdies
        }}>
            {props.children}
        </BirdieContext.Provider>
    )
}