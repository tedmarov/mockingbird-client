// I want to try having a dropdown menu render and a Text appear based on that choice
// Create Text, and pass a value on that choice

import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { TextContext } from "./TextProvider.js"
import { HumanDate } from "../utils/HumanDate.js"
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
    console.log(texts)
    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the Text state changed.
    */
    // useEffect(() => {
    //     console.log("TextList: Text state changed")
    //     console.log(Texts)
    // }, [Texts])

    // const readableDate = Date(texts.edited_on).toLocaleDateString('en-US')

    return (
        <article className="textsWindow">

            {
                texts.map(text => {
                    return (<div className="textCard" key={text.id}>
                            <h3>{text.title}</h3>
                            <h5>Submitter: {text.submitter.user.first_name} {text.submitter.user.last_name}</h5>
                            <h3>Content: {text.body}</h3>
                            <h5> Where did they find it? {text.source}</h5>
                    </div>
                    )
                })}
        </article>
    )
}