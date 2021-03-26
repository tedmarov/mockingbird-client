import React, { useContext, useRef, useState, useEffect } from "react"
import { TextContext } from "../text/TextProvider.js"
import { CategoryContext } from "../category/CategoryProvider.js"
import { UserContext } from "../birdie/UserProvider.js"
import { VoiceContext } from "../voice/VoiceProvider.js"
import "./Voice.css"

// Attendee > pull in data from 3 tables > start from Voices
// Use userVoice.VoiceId from userVoice to match userVoice.VoiceId to Voices.id
// To get to the users table > match users.id to userVoice.userid

export const VoiceDetail = (props) => {
    const { voices, getVoices } = useContext(VoiceContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { texts, getTexts } = useContext(TextContext)
    const { users, getUsers } = useContext(UserContext)

    const [voice, setVoice] = useState({
        category: {},
        text: {},
        creator: {
            user: {}
        }
    })
    const [category, setCategory] = useState({})
    const [text, setText] = useState({})
    // const [user, setUser] = useState({})

    const birdieId = localStorage.getItem("birdie")

    useEffect(() => {
        getVoices()
            .then(getTexts)
            .then(getCategories)
            .then(getUsers)
    }, [])

    console.log(voice)

    useEffect(() => {
        const voice = voices.find(v => v.id === +(props.match.params.voiceId)) || {}
        setVoice(voice)
    }, [voices])

    useEffect(() => {
        const text = texts.find(t => t.id === voice.text_id) || {}
        setText(text)
    }, [texts])
    console.log(categories)
    useEffect(() => {
        const category = categories.map(c => c.id === +(voice.categoryId)) || {}
        setCategory(category)
    }, [categories])
    
    const voice_id = voices.id

    const verifyCreator = (birdieId) => {
        if (birdieId === voices.creator_id)
        return Boolean(true);
    }
    
    console.log(voices)
    return (
        <article className="voicesWindow">
            <section className="voiceDetail">
                <h3>Voice Detail: </h3>
                <h3>Is it private? {voice.voice_privacy ? "It's private." : "It's public!" }</h3>
                <h2>{voice.voice_name} recorded on {voice.date_created}</h2>
                <div>Category: {voices.category.category_label}</div>
                <div>Text: {voices.text.text_body}</div>
                <div>Recording: {voice.voice_recording}</div>
                <div>Recorded By: {users.first_name} {users.last_name} </div>
                {verifyCreator(birdieId) ? <button className="editVoice" onClick={() => props.history.push(`/voices/edit/${voices.id}`)}></button> : ""}
            </section >
        </article>
)

    // // This section will probaby have the joinVoice function. It takes (Voice) as a parameter    
    // const joinNewVoice = () => {
    //     existingAttendeeCheck()
    //         .then((attendeeExists) => {
    //             if (!attendeeExists) {
    //                 joinUserVoice(
    //                     userId,
    //                     VoiceId
    //                 )
    //             }
    //             else {
    //                 conflictDialog.current.showModal()
    //             }
    //         }
    //         )
    // }

    // Render logic on 

}