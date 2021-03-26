// I want to try having a dropdown menu render and a Text appear based on that choice
// Create Text, and pass a value on that choice

import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { TextContext } from "./TextProvider.js"
import "./Text.css"

export const TextList = (props) => {
    // This state changes when `getTexts()` is invoked below
    const { texts, getTexts } = useContext(TextContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("TextList: Initial render before data")
        getTexts()
    }, [])

    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the Text state changed.
    */
    // useEffect(() => {
    //     console.log("TextList: Text state changed")
    //     console.log(Texts)
    // }, [Texts])

    return (
        <article className="textsWindow">

            {
                texts.map(text => {
                    return (<div className="textCard" key={text.id}>
                        < Link
                            to={{
                                pathname: `/texts/${text.id}`
                            }} >
                            <h3>{text.text_label}</h3>
                        </Link>
                    </div>
                    )
                })}
        </article>
    )
}