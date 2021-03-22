import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BirdieContext } from "../birdie/BirdieProvider.js"
import { VoiceContext } from "../events/VoiceProvider.js"
import { BirdieVoiceContext } from "../BirdieVoiceProvider.js"
import "./NavBar.css"

//Combine user and birdie?? - Heath
// When accessing user stuff, use extra dot?? (ex: birdie.user)
// Create a button to Create New Voice for user to go to New Voice Form

export const Dashboard = (props) => {
    const { birdies, getBirdies } = useContext(BirdieContext)
    const { voices, getVoices } = useContext(VoiceContext)
    const { birdieVoicesExpanded, getBirdieVoices, getBirdieVoicesExpanded } = useContext(BirdieVoiceContext)

    const [birdie, setBirdie] = useState([])
    const [voice, setVoice] = useState([])
    const [team, setTeam] = useState([])
    const [birdieVoice] = useState([])

    const birdieId = parseInt(localStorage.getItem("game_player"))

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("This is a test")
        getBirdies()
            .then(getBirdieVoices)
            .then(getBirdieVoicesExpanded)
            .then(getVoices)
    }, [])

    useEffect(() => {
        const voice = voices.find(v => v.id === birdieVoice.voiceId)
        setVoice(voice)
    }, [voices])

    useEffect(() => {
        const birdie = birdies.find(b => b.id === birdieId) || {}
        setBirdie(birdie)
    }, [birdies])

    return (
        <main className="dashboard">
            <article className="voicesWindow">
                <h2>Welcome, {birdie.username}.</h2>
                <button className="viewProfile" onClick={() => props.history.push(`/birdies/${birdie.id}`)}>My Profile</button>
                <div className="createdVoices">
                    <h3 className="dash">Voices Created</h3>
                    {voices.map(voice => {
                        if (voice.authorId === birdieId) {
                            return <div className="voiceCard" key={voice.id}>
                                < Link
                                    to={{
                                        pathname: `/voices/${voice.id}`
                                    }} >
                                    <h4>{voice.voiceName} created on {voice.voiceDateAndTime}</h4>
                                </Link>
                            </div>
                        }
                    })}
                </div>
                <div>
                    <h3 className="dash">Voices Subscribed</h3>
                    {birdieVoicesExpanded.map(voice => {
                        if (voice.birdieId === birdieId)
                            return <div className="voiceCard" key={voice.id}>
                                < Link
                                    to={{
                                        pathname: `/voices/${voice.voice.id}`
                                    }} >
                                    <h4>{voice.voice.voiceName} recorded on {Voice.voice.voiceDateAndTime}</h4>
                                </Link>
                            </div>
                    })}
                </div>
            </article>
        </main>
    )
}