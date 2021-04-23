import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CategoryContext } from "../category/CategoryProvider.js"
import { UserContext } from "../birdie/UserProvider.js"
import { VoiceContext } from "../voice/VoiceProvider.js"
import { HumanDate } from "../utils/HumanDate.js"
import "./NavBar.css"
// import { BirdieContext } from "../birdie/BirdieProvider.js"

//Combine user and birdie?? - Heath
// When accessing user stuff, use extra dot?? (ex: birdie.user)
// Create a button to Create New Voice for user to go to New Voice Form

export const Dashboard = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { voices, getVoices } = useContext(VoiceContext)
    const { categories, getCategories } = useContext(CategoryContext)

    const [user, setUser] = useState([])
    const [voice, setVoice] = useState([])

    const birdieId = localStorage.getItem("birdie")

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        getUsers()
            .then(getVoices)
    }, [])

    useEffect(() => {
        const voice = voices.find(v => v.creator_id === user.id)
        setVoice(voice)
    }, [voices])

    return (
        <main className="dashboard">
            <article className="voicesWindow">
                <h2>Welcome, {users.first_name} {users.last_name}.</h2>
                    <div className="createdVoices">
                        <h3 className="dash">Voices Created</h3>
                        {voices.map(v => {
                            console.log(v)
                            if (v.creator_id === birdieId) {
                                return <div className="voiceCard" key={v.id}>
                                    <Link
                                        to={{
                                            pathname: `/voices/${v.id}`
                                        }} >
                                        <h4>{v.name} created on {v.created}</h4>
                                    </Link>
                                </div>
                            }
                        }
                    )}
                <button onClick={() => props.history.push("/voices/create")}>
                    Create a Voice
                </button>
                </div>
                {/* <div>
                    <h3 className="dash">Voices Subscribed</h3>
                    {birdieVoicesExpanded.map(voice => {
                        if (voice.birdieId === birdieId)
                            return <div className="voiceCard" key={voice.id}>
                                < Link
                                    to={{
                                        pathname: `/voices/${voice.voice.id}`
                                    }} >
                                    <h4>{voice.voice.voiceName} recorded on {voice.voice.voiceDateAndTime}</h4>
                                </Link>
                            </div>
                    })}
                </div> */}
            </article>
        </main>
    )
}