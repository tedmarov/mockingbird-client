import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../birdie/BirdieProvider.js"
import { VoiceContext } from "../events/VoiceProvider.js"
import { UserVoiceContext }
import "./NavBar.css"   

//Combine user and birdie?? - Heath
//When accessing user stuff, use extra dot?? (ex: birdie.user)

export const Dashboard = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { events, getEvents } = useContext(EventContext)
    const { teams, getTeams } = useContext(TeamContext)
    const { userEventsExpanded, getUserEvents, getUserEventsExpanded } = useContext(UserEventContext)
    const { userTeamsExpanded, getUserTeams, getUserTeamsExpanded } = useContext(UserTeamContext)

    const [user, setUser] = useState([])
    const [event, setEvent] = useState([])
    const [team, setTeam] = useState([])
    const [userEvent] = useState([])
    const [userTeam] = useState([])

    const playerId = parseInt(localStorage.getItem("game_player"))

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("This is a test")
        getUsers()
            .then(getUserEvents)
            .then(getUserEventsExpanded)
            .then(getEvents)
            .then(getUserTeams)
            .then(getUserTeamsExpanded)
            .then(getTeams)
    }, [])

    useEffect(() => {
        const event = events.find(e => e.id === userEvent.eventId)
        setEvent(event)
    }, [events])

    useEffect(() => {
        const user = users.find(u => u.id === playerId) || {}
        setUser(user)
    }, [users])

    useEffect(() => {
        const team = teams.find(t => t.id === userTeam.teamId)
        setTeam(team)
    }, [teams])

    return (
        <main className="dashboard">
            <article className="eventsWindow">
                <h2>Welcome, {user.username}.</h2>
                <button className="viewProfile" onClick={() => props.history.push(`/users/${user.id}`)}>My Profile</button>
                <div className="hostedEvents">
                    <h3 className="dash">Events Hosting</h3>
                    {events.map(event => {
                        if (event.eventHostId === playerId) {
                            return <div className="eventCard" key={event.id}>
                                < Link
                                    to={{
                                        pathname: `/events/${event.id}`
                                    }} >
                                    <h4>{event.eventName} at {event.eventLoc}, {event.eventDateAndTime}</h4>
                                </Link>
                            </div>
                        }
                    })}
                </div>
                <div>
                    <h3 className="dash">Joined Events</h3>
                    {userEventsExpanded.map(event => {
                        if (event.userId === playerId)
                            return <div className="eventCard" key={event.id}>
                                < Link
                                    to={{
                                        pathname: `/events/${event.event.id}`
                                    }} >
                                    <h4>{event.event.eventName} at {event.event.eventLoc}, {event.event.eventDateAndTime}</h4>
                                </Link>
                            </div>
                    })}
                </div>
            </article>

            <article className="teamsWindow">
                <div className="captainedTeams">
                    <h3 className="dash">Teams Leading</h3>
                    {teams.map(team => {
                        if (team.teamLeaderId === playerId) {
                            return <div className="teamCard" key={team.id}>
                                < Link
                                    to={{
                                        pathname: `/teams/${team.id}`
                                    }} >
                                    <h4>{team.teamName}</h4>
                                </Link>
                            </div>
                        }
                    })}
                </div>
                <div>
                    <h3 className="dash">Joined Teams</h3>
                    {userTeamsExpanded.map(team => {
                        if (team.userId === playerId)
                            return <div className="teamCard" key={team.id}>
                                < Link
                                    to={{
                                        pathname: `/teams/${team.team.id}`
                                    }} >
                                    <h4>{team.team.teamName}</h4>
                                </Link>
                            </div>
                    })}
                </div>
            </article>
        </main>
    )
}