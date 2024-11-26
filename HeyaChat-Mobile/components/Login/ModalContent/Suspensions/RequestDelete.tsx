import { useState } from 'react'
import { View, Text, Pressable, Image, ImageBackground } from 'react-native'
import { susp } from './Suspension'
import { AuthorizationAPI } from '../../../../services/APIService'

import DeleteConfirmation from './DeleteConfirmation'

import Suspension from './Suspension'
import ErrorNotification from '../../../Reusables/Notifications/ErrorNotification'

type Props = {
    navigation: any
}

const RequestDelete: React.FC<Props> = ({ navigation }) => {
    const [processing, setProcessing] = useState<boolean>(false)
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const RequestDelete = async () => {
        // Hide all displayable errors
        setDisplayError(false)

        // set processing to true to display loading icon
        setProcessing(true)

        let response: any

        try {
            let api = new AuthorizationAPI()
            response = await api.RequestDelete()

            if (response.status === 201) {
                
            }
        } catch {
            setProcessing(false)
            setErrorMessage("Something went wrong")
            setDisplayError(true)
            return
        }

        // Set processing to false after we get a response
        setProcessing(false)

        // Response body structure
        // Code: 0,
        // Details: ""
        let jsonBody: DetailsDTO = await response.json()
        let code = jsonBody.Code
        let details = jsonBody.Details

        if (response.status === 201) {
            switch (code) {
                case 1970:
                    navigation.navigate("MediumModal", { Component: DeleteConfirmation, Props:[navigation] })
                    break
            }
        } else if (response.status === 403) {
            switch (code) {
                case 1930:
                    setTimeout(() => {
                        setErrorMessage("User already has an active delete request")
                        setDisplayError(true)
                    }, 500)
                    break
            }
        } else {
            setTimeout(() => {
                setErrorMessage("Something went wrong")
                setDisplayError(true)
            }, 500)
        }
    }

    return (
        <View style={susp.container}>

            <ImageBackground style={susp.background} imageStyle={{ flex: 1 }} source={require('../../../../assets/images/suspensionHeader.png')} resizeMode="cover" />

            <View style={susp.titleWrapper}>
                <Text style={susp.title}>Delete your account</Text>
            </View>

             <View style={susp.separatorWrapper}>
                <View style={susp.separator} />
            </View>

            <View style={susp.bodyWrapper}>
                <View style={{ paddingTop: 15 }}>
                    {displayError && <ErrorNotification 
                        message={errorMessage}
                        color={'red'}
                    />}
                </View>
                {displayError === false && <Text style={susp.text}>
                     Are you sure you want to delete your account?
                </Text>}
            </View>

            <View style={susp.footerWrapper}>
                <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgb(63, 118, 198)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => {RequestDelete()}}>
                    {processing === false && <Text style={{ fontSize: 15, color: 'rgba(250, 250, 250, 1)' }}>Request delete</Text>}
                    {processing && <Image style={susp.loadingIcon} source={require('../../../../assets/icons/loadingicon.gif')} />}
                </Pressable>
                <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgba(250, 250, 250, 1)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => navigation.navigate("MediumModal", { Component: Suspension, Props: [] })}>
                    <Text style={{ fontSize: 15, color: 'rgb(63, 118, 198)' }}>Cancel</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

export default RequestDelete