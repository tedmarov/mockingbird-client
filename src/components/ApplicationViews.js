import React from "react"
import { Route } from "react-router-dom"
import { BirdieProvider } from "./birdie/BirdieProvider.js"
import { Dashboard } from "./nav/Dashboard.js"
import { Register } from "./auth/Register.js"
import { VoiceForm } from "./voice/VoiceForm.js"
import { VoiceProvider } from "./voice/VoiceProvider.js"
import { CategoryProvider } from "./category/CategoryProvider.js"

export const ApplicationViews = (props) => {
    return (
        <>
        <BirdieProvider>
            <VoiceProvider>
                <Route exact path="/" render={
                    props => <Dashboard {...props} />
                } />
            </VoiceProvider>
        </BirdieProvider>
        <VoiceProvider>
            <CategoryProvider>
                <Route path="/voices/create" rende={
                    props=> <VoiceForm {...props} />
                } />
            </CategoryProvider>
        </VoiceProvider>
        </>
    )
}

