import React, { useContext, useState, useEffect } from "react"
import { TextContext } from "../text/TextProvider.js"
import { CategoryContext } from "../category/CategoryProvider.js"
import { UserContext } from "../birdie/UserProvider.js"
import { VoiceContext } from "../voice/VoiceProvider.js"
import "./Voice.css"

// Attendee > pull in data from 3 tables > start from Voices
// Use userVoice.VoiceId from userVoice to match userVoice.VoiceId to Voices.id
// To get to the users table > match users.id to userVoice.userid

export const VoiceDetail = (props) => {
    const { voices, getVoices, getSingleVoice } = useContext(VoiceContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { texts, getTexts } = useContext(TextContext)
    const { users, getUsers } = useContext(UserContext)

    const [deleteWarning, setDeleteWarning] = useState(false)

    const [voice, setVoice] = useState({
        category: {},
        text: {},
        creator: {
            user: {}
        }
    })
    const [category, setCategory] = useState({})
    const [text, setText] = useState({})
    const [user, setUser] = useState({})
    
    const birdieId = localStorage.getItem("birdie")

    useEffect(() => {
        getVoices()
        getTexts()
        getCategories()
        getUsers()
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

    useEffect(() => {
        const category = categories.find(c => c.id === parseInt(voice.category_id)) || {}
        setCategory(category)
    }, [categories])

    const profileMatch = birdieId === voice.creator_id
    
    // const voice_id = voices.id

    const verifyCreator = (birdieId) => {
        // console.log(voice.creator.key)
        // if (birdieId === voice.creator.key)
        return Boolean(true);
    }
    
    console.log(voices)
    return (
        <article className="voicesWindow">
            <section className="voiceDetail">
                <h2>Voice Detail: </h2>
                <h3>Is it private? {voice.privacy ? "It's private." : "It's public!" }</h3>
                <h3>{voice.name} recorded on {voice.created}</h3>
                <h5>Category: {category.category_label}</h5>
                <div>Text: {text.text_body}</div>
                <div>Recording: {voice.recording}</div>
                <div>Recorded By: {users.first_name} {users.last_name} </div>
                {verifyCreator(birdieId) ? <button className="editVoice" onClick={() => props.history.push(`/voices/edit/${voice.id}`)}>Edit Voice</button> : ""}
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