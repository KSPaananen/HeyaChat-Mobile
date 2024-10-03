import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import ErrorBox from '../../CommonComponents/ErrorBox'

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
    const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false)

    // GUI displayables
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [blurPassword, setBlurPassword] = useState<boolean>(true)

    const onSubmit = async () => {
        // Reset all displayable errors on GUI
        setDisplayError(false)

        // Post login details to backend
        let api = new AuthorizationAPI()
        // Add biometrics login later to api.Login()
        let response = await api.Login(loginField, passwordField, null)
        
        if (response === null) {
            setErrorMessage("Something went wrong :(")
            setDisplayError(true)
            return
        }

        // Read code from body
        let jsonBody = await response.json()
        let code = jsonBody.code

        if (response.status === 200) {
            // Act based on code read from body
            if (code === 451) {        // Succesfully logged in
                navigation.navigate("AppBottomTabs", { screen: "Home"})
            } else if (code === 452) { // Succesfully logged in. Email is not verified
                navigateToEmailVerifying()
            }
        } else if (response.status === 202) {
            if (code === 450) {        // User logged in from new device with mfa enabled
                navigateToMfaVerifying()
            }
        } else if (response.status === 401) {
            if (code === 410) {
                setErrorMessage("Couldn't find user matching login details")
                setDisplayError(true)
            } else if (code === 411) {
                setErrorMessage("Incorrect password")
                setDisplayError(true)
            }
        } else if (response.status === 403) {
            if (code == 412) {
                // Display user suspended modal

            } else if (code === 413) {
                // Display user permanently suspended modal

            }
        }
    }

  return (
    <View>
        <View style={{ ...auth.head, ...{ height: "40%"} }}>
            <View style={auth.titleWrapper}>
                <Text style={auth.title}>Heya!Chat</Text>
                <Image style={auth.icon} source={require('../../../assets/icons/icon.png')} />
            </View>
        </View>

        <View style={{ ...auth.body, ...{ height: "45%"} }}>

            {displayError && <ErrorBox 
                message={errorMessage}
                borderRadius={5}
                onPress={() => setDisplayError(false)}
            />}
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
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
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
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
            <View style={{ ...auth.checkboxBtnWrapper, ...{ justifyContent: 'flex-end', marginRight: 10 } }}>
                <Pressable style={auth.checkboxBtn} onPress={() => setStayLoggedIn(!stayLoggedIn)}>
                    <Checkbox 
                        onPress={() => setStayLoggedIn(!stayLoggedIn)}
                        status={ stayLoggedIn ? "checked" : "unchecked"}
                    />
                </Pressable>
                <Text style={auth.checkboxText}>Stay signed in</Text>
            </View>
            <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 40} }}>
                <Pressable style={auth.primaryBtn} onPress={() => onSubmit()} >
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
                        <Text style={auth.secondaryBtnText}>Don't have an account? <Text style={{ color: 'blue' }}>Sign up!</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Login