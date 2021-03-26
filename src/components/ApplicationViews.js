import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./birdie/UserProvider.js"
import { BirdieProvider } from "./birdie/BirdieProvider.js"
import { Dashboard } from "./nav/Dashboard.js"
import { VoiceForm } from "./voice/VoiceForm.js"
import { VoiceList } from "./voice/VoiceList.js"
import { VoiceDetail } from "./voice/VoiceDetail.js"
import { VoiceProvider } from "./voice/VoiceProvider.js"
import { CategoryProvider } from "./category/CategoryProvider.js"
import { TextProvider } from "./texts/TextProvider.js"

export const ApplicationViews = () => {
    return (
        <>
            <UserProvider>
                <BirdieProvider>
                    <VoiceProvider>
                        <CategoryProvider>
                            <Route exact path="/" render={
                                props => <Dashboard {...props} />
                            } />
                        </CategoryProvider>
                    </VoiceProvider>
                </BirdieProvider>
            </UserProvider>        
        <TextProvider>
            <BirdieProvider>
                <VoiceProvider>
                        <CategoryProvider>
                            <Route exact path="/voices" render={
                                props => <VoiceList {...props} />
                            } />
                            <Route path="/voices/create" render={
                                props => <VoiceForm {...props} />
                            }/>
                            <Route path="/voices/:voiceId(\d+)" render={
                                props => <VoiceDetail {...props} />
                            } />
                            <Route path="/voices/edit/:voiceId(\d+)" render={
                                props => <VoiceForm {...props} />
                            } />                            
                        </CategoryProvider>
                </VoiceProvider>
            </BirdieProvider>
        </TextProvider>    

        </>
    )
}

