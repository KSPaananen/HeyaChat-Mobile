import { useEffect, useState } from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { TextInput, Checkbox } from 'react-native-paper'
import { Octicons } from '@expo/vector-icons'
import { AuthorizationAPI } from '../../../services/APIService'
import { StorageService } from '../../../services/StorageService'
import { auth } from '../AuthorizationPage'

import ErrorNotification from '../../Reusables/Notifications/ErrorNotification'
import Suspension from '../ModalContent/Suspensions/Suspension'

interface Props {
    setContact: any
    setContactType: any
    navigation: any
    navigateToRecovery: () => void // Navigate to recovery page
    navigateToRegistering: () => void // Navigate to registeration screen
    navigateToMfaVerifying: () => void // Navigate to mfa verifying screen
    navigateToEmailVerifying: () => void // Navigate to email verifying screen
}

const Login: React.FC<Props> = ({ setContact, setContactType, navigation, navigateToRecovery, navigateToRegistering, navigateToMfaVerifying, navigateToEmailVerifying }) => {
    // Fields/buttons
    const [loginField, setLoginField] = useState<string>("")
    const [passwordField, setPasswordField] = useState<string>("")
    const [staySignedIn, setStaySignedIn] = useState<boolean>(false)

    // GUI 
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [blurPassword, setBlurPassword] = useState<boolean>(true)
    const [processing, setProcessing] = useState<boolean>(false)

    const onSubmit = async () => {
        // Reset all displayable errors on GUI
        setDisplayError(false)

        // Set processing to true to alter GUI state
        // After we get a response, set processing to false
        setProcessing(true)

        setTimeout(() => {
            setProcessing(false)
            return
        }, 5000)

        let response: any

        // Post login details to backend
        // Add biometrics login later to api.Login()
        try {
            let api = new AuthorizationAPI()
            response = await api.Login(loginField, passwordField, null)
        } catch {
            setTimeout(() => {
                // Add delay so the notification component renders properly
                setErrorMessage("Something went wrong :(")
                setDisplayError(true)
            }, 500)
            setProcessing(false)
            return
        }

        setProcessing(false)

        // Response body structure
        // Contact: ""
        // Suspension: {
        //    Reason: "",
        //    Expires: ""
        // }
        // Details: {
        //    Code: 0,
        //    Details: ""
        // }
        let jsonBody: LoginDTO = await response.json()
        let contact = jsonBody.Contact
        let code = jsonBody.Details?.Code

        let storageService = new StorageService()

        // setContact and setContactType are for displaying users blurred details in other screens if they're required

        if (response.status === 200) {
            // Set the state of "staySignedIn" to storage
            await storageService.StoreValue("staysignedin", String(staySignedIn))
            switch (code) {
                case 1272:
                    // Reset stack so user cant return to login screen without logging out
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'AppBottomTabs', params: { screen: 'Home' } }],
                        })
                      )
                    break
                case 1273:
                    setContact(contact)
                    setContactType("email")
                    navigateToEmailVerifying()
                    break
            }
        } else if (response.status === 202) {
            // Set the state of "staySignedIn" to storage
            await storageService.StoreValue("staysignedin", String(staySignedIn))
            switch (code) {
                case 1270:
                    setContact(contact)
                    setContactType("phone")
                    break
                case 1271:
                    setContact(contact)
                    setContactType("email")
                    break
            }
            navigateToMfaVerifying()
        } else if (response.status === 401) { // Login was unsuccesful
            switch (code) {
                case 1230:
                    setTimeout(() => {
                        // Add delay so the notification component renders properly
                        setErrorMessage("Couldn't find user matching login details")
                        setDisplayError(true)
                    }, 500)
                    break
                case 1231:
                    setTimeout(() => {
                        // Add delay so the notification component renders properly
                        setErrorMessage("Incorrect password")
                        setDisplayError(true)
                    }, 500)
                    break
            }
        } else if (response.status === 403) {
            switch (code) {
                case 1233:
                    // Display user suspended modal
                    navigation.navigate("MediumModal", { Component: Suspension, Props: [false, jsonBody.Suspension?.Expires, jsonBody.Suspension?.Reason] })
                    break;
                case 1232:
                    // Display user suspended modal. Set param1 to true to signify a permanent suspension
                    navigation.navigate("MediumModal", { Component: Suspension, Props: [true, jsonBody.Suspension?.Expires, jsonBody.Suspension?.Reason] })
                    break
            }
        } else if (response.status === 406) {
            switch (code) {
                case 1234:
                    // Display active delete request modal
                    
                    break
            }
        }
    }

  return (
    <View>
        <View style={{ ...auth.head, ...{ height: "43%"} }}>
            <View style={auth.titleWrapper}>
                <Text style={auth.title}>Heya!Chat</Text>
                <Image style={auth.icon} source={require('../../../assets/icons/icon.png')} />
            </View>
        </View>

        <View style={{ ...auth.body, ...{ height: "42%"} }}>

            <View style={auth.notificationWrapper}>
                {displayError && <ErrorNotification message={errorMessage} color={'white'} />}
            </View>
            
            <View style={auth.inputWrapper}>
                <TextInput 
                    style={auth.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    dense
                    value={loginField}
                    onChangeText={(value) => setLoginField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Username or email" 
                    left={<TextInput.Icon icon={() => <Octicons name="person" size={23} color="rgb(63, 118, 198)" />} />} 
                />
            </View>

            <View style={auth.notificationWrapper}>
                
            </View>

            <View style={auth.inputWrapper}>
                <TextInput 
                    style={auth.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    dense
                    value={passwordField}
                    secureTextEntry={blurPassword}
                    onChangeText={(value) => setPasswordField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Password" 
                    right={passwordField && <TextInput.Icon icon={() => <Octicons name={blurPassword ? "eye" : "eye-closed"} size={25} color="rgb(63, 118, 198)" />} onPress={() => setBlurPassword(!blurPassword)} />}
                    left={<TextInput.Icon icon={() => <Octicons name="lock" size={25} color="rgb(63, 118, 198)" />} />} 
                    
                />
            </View>
            <View style={{ ...auth.checkboxBtnWrapper, ...{ justifyContent: 'flex-end', marginRight: 10 } }}>
                <Pressable style={auth.checkboxBtn} onPress={() => setStaySignedIn(!staySignedIn)}>
                    <Checkbox 
                        onPress={() => setStaySignedIn(!staySignedIn)}
                        status={ staySignedIn ? "checked" : "unchecked"}
                        color={'rgba(50, 200, 205, 1)'}
                        uncheckedColor={'rgba(50, 200, 205, 1)'}
                    />
                </Pressable>
                <Text style={auth.checkboxText}>Stay signed in</Text>
            </View>
            <View style={auth.primaryBtnWrapper}>
                <Pressable style={loginField != "" && passwordField != "" ? auth.primaryBtn : auth.primaryBtnDisabled} disabled={processing === true || loginField == "" || passwordField == ""} onPress={() => onSubmit()} >
                    {processing && <Image style={auth.loadingIcon} source={require('../../../assets/icons/loadingicon.gif')} />}
                    {processing === false && <Text style={auth.primaryBtnText}>Login</Text>}
                </Pressable>
            </View>
            <View style={auth.secondaryBtnWrapper}>
                {/* Reset errorbox when navigating to other screens */}
                <Pressable style={auth.secondaryBtn} onPress={() => {navigateToRecovery(); setDisplayError(false)}}>
                    <Text style={auth.secondaryBtnText}>Forgot your password?</Text>
                </Pressable>
            </View>
        </View>

        <View style={{ ...auth.footer, ...{ height: "15%" } }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={auth.secondaryBtnWrapper}>
                    {/* Reset errorbox when navigating to other screens */}
                    <Pressable style={auth.secondaryBtn} onPress={() => {navigateToRegistering(); setDisplayError(false)}}> 
                        <Text style={auth.secondaryBtnText}>Don't have an account? <Text style={{ color: 'rgba(50, 225, 225, 1)' }}>Sign up!</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Login