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
console.log(texts)
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

    useEffect(() => {
        getVoices()
        getUsers()
        getTexts()
        getCategories()
    }, [])

    console.log(voice)

    useEffect(() => {
        const voice = voices.find(v => v.id === +(props.match.params.voice_id)) || {}
        setVoice(voice)
    }, [voices])

    useEffect(() => {
        const text = texts.find(t => t.id === voice.text_id) || {}
        setText(text)
    }, [texts])
    console.log(text)


    useEffect(() => {
        const category = categories.find(c => c.id === parseInt(voice.category_id)) || {}
        setCategory(category)
    }, [categories])

    const birdieId = localStorage.getItem("birdie")

    const profileMatch = birdieId === voice.creator_id
    
    // const voice_id = voices.id

    const verifyCreator = (birdieId) => {
        // console.log(voice.creator.key)
        // if (birdieId === voice.creator.key)
        return Boolean(true);
    }
    
    return (
        <article className="voicesWindow">
            <section className="voiceDetail">
                <h2>Voice Detail: </h2>
                <h3>Is it private? {voice.privacy ? "It's private." : "It's public!" }</h3>
                <h3>{voice.name} recorded on {voice.create_date}</h3>
                <h5>Category: {category.label}</h5>
                <div>Text: {text.body}</div>
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