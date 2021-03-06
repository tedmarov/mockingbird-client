import React, { useState } from "react"

//The context is imported and used by individual components that need data.
// It's an empty warehouse for Voice data right now.
export const TextContext = React.createContext()

// This component establishes what data can be used.
// useState holds and sets an array of Texts
export const TextProvider = (props) => {
    const [texts, setTexts] = useState([])

    // These are State Transition Functions for Texts
    const getTexts = () => {
        return fetch("http://localhost:8000/texts", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("birdie")}`
            }
        })
            .then(r => r.json())
            .then(setTexts)
    }

    const addText = text => {
        return fetch("http://localhost:8000/texts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(text)
        })
            .then(getTexts)
    }

    const updateText = text => {
        return fetch(`http://localhost:8000/texts/${text.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(text)
        })
            .then(getTexts)
    }

    const deleteText = textId => {
        return fetch(`http://localhost:8000/texts/${textId}`, {
            method: "DELETE",
        })
            .then(getTexts)
    }

    /*
        You return a context provider which has the
        `texts` state (array of Texts), the `addText` function,
        and the `getText` function as keys. This allows any child elements to access them.
    */
    return (
        <TextContext.Provider value={{
            texts, addText, getTexts, updateText, deleteText
        }}>
            {props.children}
        </TextContext.Provider>
    )
}