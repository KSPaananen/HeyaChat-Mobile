import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import { Octicons } from '@expo/vector-icons'
import { AuthorizationAPI } from '../../../services/APIService'
import { StorageService } from '../../../services/StorageService'
import { auth } from '../AuthorizationPage'

import ErrorNotification from '../../CommonComponents/Notifications/ErrorNotification'

interface Props {
    navigation: any
    navigateToRecovery: () => void // Navigate to recovery page
    navigateToRegistering: () => void // Navigate to registeration screen
    navigateToMfaVerifying: () => void // Navigate to mfa verifying screen
    navigateToEmailVerifying: () => void // Navigate to email verifying screen
}

const Login: React.FC<Props> = ({ navigation, navigateToRecovery, navigateToRegistering, navigateToMfaVerifying, navigateToEmailVerifying }) => {
    // Fields/buttons
    const [loginField, setLoginField] = useState<string>("")
    const [passwordField, setPasswordField] = useState<string>("")
    const [staySignedIn, setStaySignedIn] = useState<boolean>(false)

    // GUI 
    const [primButtonPressed, setPrimButtonPressed] = useState<boolean>(false)
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [blurPassword, setBlurPassword] = useState<boolean>(true)

    const onSubmit = async () => {
        // Reset all displayable errors on GUI
        setDisplayError(false)

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
            return
        }

        // Read code from body
        let jsonBody = await response.json()

        let storageService = new StorageService()

        if (response.status === 200) { // Succesfully logged in
            // Set the state of "staySignedIn" to storage
            await storageService.StoreValue("staysignedin", String(staySignedIn))

            // Act based on code read from body
            if (jsonBody.code === 451) {        // Succesfully logged in
                navigation.navigate("AppBottomTabs", { screen: "Home"})
            } else if (jsonBody.code === 452) { // Succesfully logged in. Email is not verified
                navigateToEmailVerifying()
            }
        } else if (response.status === 202) { // Succesfully logged, but additional confirmation required
            // Set the state of "staySignedIn" to storage
            await storageService.StoreValue("staysignedin", String(staySignedIn))

            if (jsonBody.code === 450) {
                navigateToMfaVerifying()
            }
        } else if (response.status === 401) { // Login was unsuccesful
            if (jsonBody.code === 410) {
                setTimeout(() => {
                    // Add delay so the notification component renders properly
                    setErrorMessage("Couldn't find user matching login details")
                    setDisplayError(true)
                }, 500)
            } else if (jsonBody.code === 411) {
                setTimeout(() => {
                    // Add delay so the notification component renders properly
                    setErrorMessage("Incorrect password")
                    setDisplayError(true)
                }, 500)
            }
        } else if (response.status === 403) {
            if (jsonBody.code == 412) {
                // Display user suspended modal

            } else if (jsonBody.code === 413) {
                // Display user permanently suspended modal

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
                {displayError && <ErrorNotification message={errorMessage} />}
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
                    right={passwordField && 
                        <TextInput.Icon
                            icon={blurPassword ? "eye" : "eye-off"}
                            onPress={() => setBlurPassword(!blurPassword)}
                        />
                    }
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
                <Pressable style={loginField != "" && passwordField != "" ? auth.primaryBtn : auth.primaryBtnDisabled} onPress={() => onSubmit()} >
                    <Text style={auth.primaryBtnText}>Login</Text>
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
                        <Text style={auth.secondaryBtnText}>Don't have an account? <Text style={{ color: 'rgba(50, 200, 205, 1)' }}>Sign up!</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Login