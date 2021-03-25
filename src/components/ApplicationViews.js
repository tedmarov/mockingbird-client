import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./birdie/UserProvider.js"
import { BirdieProvider } from "./birdie/BirdieProvider.js"
import { Dashboard } from "./nav/Dashboard.js"
import { Register } from "./auth/Register.js"
import { VoiceForm } from "./voice/VoiceForm.js"
import { VoiceList } from "./voice/VoiceList.js"
import { VoiceProvider } from "./voice/VoiceProvider.js"
import { CategoryProvider } from "./category/CategoryProvider.js"
// import { BirdieVoicesProvider } from "./birdie/BirdieVoicesProvider.js"

export const ApplicationViews = (props) => {
    return (
        <>
            <UserProvider>
                <BirdieProvider>
                    <VoiceProvider>
                        {/* <BirdieVoicesProvider> */}
                            <Route exact path="/" render={
                                props => <Dashboard {...props} />
                            } />
                        {/* </BirdieVoicesProvider> */}
                    </VoiceProvider>
                </BirdieProvider>
            </UserProvider>        
            <BirdieProvider>
                <VoiceProvider>
                    {/* <BirdieVoicesProvider> */}
                        <CategoryProvider>
                            <Route exact path="/voices" render={
                                props => <VoiceList {...props} />
                            } />
                            <Route path="/voices/create" render={
                                props=> <VoiceForm {...props} />
                            } />
                        </CategoryProvider>
                    {/* </BirdieVoicesProvider> */}
                </VoiceProvider>
            </BirdieProvider>

        </>
    )
}

