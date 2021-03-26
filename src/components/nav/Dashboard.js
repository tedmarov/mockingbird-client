import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CategoryContext } from "../category/CategoryProvider.js"
import { UserContext } from "../birdie/UserProvider.js"
import { VoiceContext } from "../voice/VoiceProvider.js"
import "./NavBar.css"
// import { BirdieContext } from "../birdie/BirdieProvider.js"

//Combine user and birdie?? - Heath
// When accessing user stuff, use extra dot?? (ex: birdie.user)
// Create a button to Create New Voice for user to go to New Voice Form

export const Dashboard = (props) => {
    // const { birdies, getBirdies } = useContext(BirdieContext)
    const { voices, getVoices } = useContext(VoiceContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { users, getUsers } = useContext(UserContext)

    const [user, setUser] = useState([])
    const [birdie, setBirdie] = useState([])
    const [voice, setVoice] = useState([])

    const birdieId = parseInt(localStorage.getItem("birdie"))

    // Function to help update search filters, if ever implemented
    // const changeVoices = event => {
    //     if (event.target.value !== "0") {

    //         const newVoices = []
    //         voices.forEach(voice => {
    //             if (+(voice.category.id) === +(event.target.value)) {
    //                 newVoices.push(voice)
    //             }
    //             setFiltered(newVoices)
    //         })
    //     }
    //     else {
    //         setFiltered(voices)
    //     }
    // }

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("This is a test")
        getVoices()
            .then(getUsers)
    }, [])

    useEffect(() => {
        const voice = voices.find(v => v.id === user.id)
        setVoice(voice)
    }, [])

    // useEffect(() => {
    //     const user = users.find(b => b.id === birdieId) || {}
    //     setUser(user)
    // }, [users])

    return (
        <main className="dashboard">
            <article className="voicesWindow">
                <h2>Welcome, {users.first_name} {users.last_name}.</h2>
                <button className="viewProfile" onClick={() => props.history.push(`/users/${users.id}`)}>My Profile</button>
                <div className="createdVoices">
                    <h3 className="dash">Voices Created</h3>
                    {voices.map(voice => {

                            return <div className="voiceCard" key={voice.id}>
                                < Link
                                    to={{
                                        pathname: `/voices/${voice.id}`
                                    }} >
                                    <h4>{voice.voice_name} created on {voice.    date_created}</h4>
                                </Link>
                            </div>
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